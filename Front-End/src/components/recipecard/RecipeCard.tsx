// src/components/recipecard/RecipeCard.tsx
import { useState } from 'react';
import { type Receita } from '../../types/Receita';
import styles from './RecipeCard.module.css';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
    data: Receita;
}

const RecipeCard = ({ data }: RecipeCardProps) => {
    const primeiraLetra = data.nome ? data.nome.charAt(0).toUpperCase() : '?';
    const [hasImageError, setHasImageError] = useState(false);
    const navigate = useNavigate();

    // Função para excluir direto da listagem (abas)
    const handleExcluirDaLista = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Impede que o clique na lixeira abra a página da receita
        
        const confirmar = window.confirm(`Tem certeza que deseja apagar a receita de ${data.nome}?`);
        if (confirmar) {
            try {
                const response = await fetch(`http://localhost:8080/receitas/${data.id}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    window.location.reload(); // Recarrega a página para atualizar a aba
                } else {
                    alert("Erro ao excluir a receita.");
                }
            } catch (error) {
                console.error("Erro ao excluir:", error);
            }
        }
    };

    return (
        <article
            className={styles.card}
            onClick={() => navigate(`/receita/${data.id}`)}
            style={{ position: 'relative' }} // Garante que a lixeira absoluta fique presa dentro do card
        >
            {/* Ícone SVG de Lixeira no canto direito do Card - Área de Clique Aumentada */}
            <button 
                onClick={handleExcluirDaLista}
                title="Apagar Receita"
                style={{ 
                    position: 'absolute',
                    top: '25%',
                    right: '10px',
                    cursor: 'pointer', 
                    // Aumentei o padding para criar uma zona de clique invisível maior
                    padding: '12px', 
                    color: '#9ca3af', 
                    transition: 'all 0.2s ease',
                    zIndex: 10,
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // Adicionei um border-radius para o caso de você querer testar um hover de fundo depois
                    borderRadius: '50%'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.color = '#ef4444';
                    e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.color = '#9ca3af';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                {/* Aumentei o tamanho do ícone de 18 para 22 */}
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>

            <div className={styles.imageArea}>
                {data.urlFoto && !hasImageError ? (
                <img
                    src={data.urlFoto}
                    alt={`Foto de ${data.nome}`}
                    className={styles.foto}
                    onError={() => setHasImageError(true)}
                />
                ) : (
                <div className={styles.placeholder} aria-label="Receita sem foto">
                    <span>{primeiraLetra}</span>
                </div>
                )}
            </div>

            <div className={styles.textArea}>
                {/* NOVA ESTRUTURA: Categoria em cima, Subcategoria embaixo */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '8px' }}>
                    <span className={styles.subcategoria} style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.7 }}>
                        {data.categoria}
                    </span>
                    {data.subcategoria && (
                        <span className={styles.subcategoria} style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                            {data.subcategoria}
                        </span>
                    )}
                </div>
                
                <h2 className={styles.titulo} style={{ margin: 0 }}>{data.nome}</h2>
            </div>
        </article>
    );
};

export default RecipeCard;