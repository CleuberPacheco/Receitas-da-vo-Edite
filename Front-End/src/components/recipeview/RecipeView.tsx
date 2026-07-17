// src/components/RecipeView/RecipeView.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type Receita } from '../../types/Receita';
import styles from './RecipeView.module.css';

interface RecipeViewProps {
    onEdit?: (receita: Receita) => void;
}

const RecipeView = ({ onEdit }: RecipeViewProps) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [receita, setReceita] = useState<Receita | null>(null);
    const [loading, setLoading] = useState(true);

    // Busca a receita real no seu Back-end Spring Boot
    useEffect(() => {
        fetch(`http://localhost:8080/receitas/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Receita não encontrada no servidor');
                }
                return res.json();
            })
            .then((data) => {
                setReceita(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao buscar receita:", err);
                setReceita(null); // Garante que fica nulo em caso de erro
                setLoading(false);
            });
    }, [id]);

    // Função para excluir a receita
    const handleExcluir = async () => {
        const confirmar = window.confirm("Tem certeza que deseja apagar esta receita do caderno da Vó Edite?");
        
        if (confirmar) {
            try {
                const response = await fetch(`http://localhost:8080/receitas/${id}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    alert("Receita apagada com sucesso!");
                    navigate('/'); // Volta para a tela inicial
                    window.location.reload(); // Atualiza a página para recarregar a lista do Back-end
                } else {
                    alert("Erro ao excluir a receita.");
                }
            } catch (error) {
                console.error("Erro ao excluir:", error);
                alert("Erro de conexão ao tentar apagar a receita.");
            }
        }
    };

    if (loading) return <div className={styles.container}>Carregando...</div>;

    if (!receita) {
        return (
            <div className={styles.container} style={{ textAlign: 'center' }}>
                <h1 className={styles.titulo}>Receita não encontrada!</h1>
                <button className={styles.backBtn} onClick={() => navigate('/')}>
                    Voltar para Home
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.topActions}>
                <button className={styles.backBtn} onClick={() => navigate('/')}>
                    &larr; Voltar
                </button>
                
                <button 
                    className={styles.editBtn} 
                    onClick={() => onEdit && onEdit(receita)}
                >
                    ✏️ Editar
                </button>
            </div>

            {/* Container Flex para manter o Título de um lado e a Lixeira do outro */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                
                <div className={styles.header} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4px', margin: 0 }}>
                    
                    {/* NOVA ESTRUTURA: Categoria em cima, Subcategoria embaixo */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span className={styles.subcategoria} style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.7 }}>
                            {receita.categoria}
                        </span>
                        {receita.subcategoria && (
                            <span className={styles.subcategoria} style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>
                                {receita.subcategoria}
                            </span>
                        )}
                    </div>
                    
                    <h1 className={styles.titulo} style={{ margin: 0, marginTop: '4px' }}>{receita.nome}</h1>
                </div>

                {/* Ícone SVG Minimalista de Apagar ao lado do título */}
                <button 
                    onClick={handleExcluir}
                    title="Apagar Receita"
                    style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: '8px',
                        color: '#9ca3af', 
                        transition: 'color 0.2s ease, transform 0.2s ease',
                        marginBottom: '-25px'
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>

            {receita.urlFoto && (
                <div className={styles.fotoContainer}>
                    <img src={receita.urlFoto} alt={`Foto de ${receita.nome}`} className={styles.foto} />
                </div>
            )}

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Ingredientes</h2>
                <ul className={styles.lista}>
                    {receita.ingredientes && Array.isArray(receita.ingredientes) ? (
                        (receita.ingredientes as string[]).map((ing: string, i: number) => (
                            <li key={i} className={styles.itemLista}>{ing}</li>
                        ))
                    ) : typeof receita.ingredientes === 'string' ? (
                        (receita.ingredientes as string).split('\n').map((ing: string, i: number) => (
                            <li key={i} className={styles.itemLista}>{ing}</li>
                        ))
                    ) : (
                        <li className={styles.itemLista}>{String(receita.ingredientes)}</li>
                    )}
                </ul>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Modo de Preparo</h2>
                <p className={styles.modoPreparo}>{receita.modoPreparo}</p>
            </div>
        </div>
    );
};

export default RecipeView;