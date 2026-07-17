// src/components/Footer/Footer.tsx
import styles from './Footer.module.css';

interface FooterProps {
    tema?: 'dark' | 'light';
    onToggleTema?: () => void;
}

const Footer = ({ tema, onToggleTema }: FooterProps) => {
    return (
        <footer className={styles.footer}>
        
        <p className={styles.copyright}>© 2026 Receitas da Vó Edite</p>

        {/* O Novo Botão Deslizante (Toggle Switch) */}
        {onToggleTema && (
            <button 
            onClick={onToggleTema} 
            className={`${styles.toggleContainer} ${tema === 'dark' ? styles.dark : styles.light}`}
            aria-label="Alternar Tema"
            >
            <span className={styles.iconSun}>☀️</span>
            <span className={styles.iconMoon}>🌙</span>
            <div className={styles.slider}></div>
            </button>
        )}

        </footer>
    );
};

export default Footer;