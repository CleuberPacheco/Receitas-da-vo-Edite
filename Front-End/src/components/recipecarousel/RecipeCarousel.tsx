// src/components/RecipeCarousel/RecipeCarousel.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecipeCarousel.module.css';
import { type Receita } from '../../types/Receita';

interface RecipeCarouselProps {
    receitas: Receita[];
}

const RecipeCarousel = ({ receitas }: RecipeCarouselProps) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (receitas.length === 0) return;
        
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % receitas.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [receitas.length]);

    if (receitas.length === 0) return null;

    const prevIndex = (currentIndex - 1 + receitas.length) % receitas.length;
    const nextIndex = (currentIndex + 1) % receitas.length;

    return (
        <div className={styles.carouselContainer}>
        {receitas.map((receita, index) => {
            
            let positionClass = styles.hiddenCard;
            if (index === currentIndex) positionClass = styles.centerCard;
            else if (index === prevIndex) positionClass = styles.leftCard;
            else if (index === nextIndex) positionClass = styles.rightCard;

            const isCenter = index === currentIndex;

            return (
            <div 
                key={receita.id} 
                className={`${styles.card} ${positionClass}`}
                onClick={() => navigate(`/receita/${receita.id}`)}
            >
                {/* Imagem de Fundo */}
                {receita.urlFoto ? (
                    <img src={receita.urlFoto} alt={receita.nome} className={styles.foto} />
                ) : (
                    <div className={styles.placeholder}>🍲</div>
                )}
                
                {/* Texto sobre a imagem */}
                <div className={styles.overlay}>
                    <h3 className={styles.titulo}>{receita.nome}</h3>
                    
                    {isCenter && receita.ingredientes && (
                        <div className={styles.ingredientesWrapper}>
                            {/* Ajuste apenas para garantir o formato de lista empilhada */}
                            <ul className={styles.ingredientes} style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '4px',
                                textAlign: 'left',
                                paddingLeft: '20px',
                                margin: 0
                            }}>
                                {/* Nova lógica: separa por array ou por quebra de linha */}
                                {Array.isArray(receita.ingredientes) 
                                    ? receita.ingredientes.map((ingrediente, i) => <li key={i}>{ingrediente}</li>)
                                    : typeof receita.ingredientes === 'string'
                                        ? (receita.ingredientes as string).split('\n').map((ing, i) => <li key={i}>{ing}</li>)
                                        : <li>{String(receita.ingredientes)}</li>
                                }
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            );
        })}
        </div>
    );
};

export default RecipeCarousel;