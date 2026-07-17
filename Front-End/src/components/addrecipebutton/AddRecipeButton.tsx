// src/components/AddRecipeButton/AddRecipeButton.tsx
import styles from './AddRecipeButton.module.css';
import { useNavigate } from 'react-router-dom';

const AddRecipeButton = () => {
    const navigate = useNavigate();

    return (
        // Um container para podermos alinhar o botão facilmente (ex: à direita ou ao centro)
        <div className={styles.container}>
        <button 
            className={styles.btn} 
            onClick={() => navigate('/nova-receita')}
        >
            <span className={styles.icon}>+</span>
            Nova Receita
        </button>
        </div>
    );
};

export default AddRecipeButton;