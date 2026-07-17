// src/components/addrecipefab/AddRecipeFab.tsx
import styles from './AddRecipeFab.module.css';

// 1. O botão agora recebe uma função via Props para executar ao ser clicado
interface AddRecipeFabProps {
    onClick: () => void;
}

const AddRecipeFab = ({ onClick }: AddRecipeFabProps) => {
    return (
        <button 
        className={styles.fab} 
        onClick={onClick} // 2. Chama a função que vier do App.tsx
        aria-label="Adicionar nova receita"
        title="Adicionar nova receita"
        >
        <span className={styles.icon}>+</span>
        </button>
    );
};

export default AddRecipeFab;