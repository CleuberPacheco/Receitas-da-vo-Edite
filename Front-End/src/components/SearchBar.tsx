// src/components/SearchBar.tsx
import styles from './SearchBar.module.css';

// 1. Criamos a interface para avisar o TypeScript que este componente recebe "ordens" de fora
interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 2. Recebemos o value e onChange nas props
const SearchBar = ({ value, onChange }: SearchBarProps) => {
    
    return (
        <div className={styles.container}>
        <div className={styles.inputWrapper}>
            {/* Ícone de Lupa em SVG (Limpo e leve) */}
            <svg 
            className={styles.icon} 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>

            <input
            type="text"
            className={styles.input}
            placeholder="Buscar receita..."
            value={value} // O texto agora é controlado pelo App.tsx
            onChange={onChange} // Cada letra digitada avisa o App.tsx para filtrar a lista
            />
        </div>
        </div>
    );
};

export default SearchBar;