import { Link } from 'react-router-dom'; // 1. Importamos o Link
import styles from './Header.module.css';
import logo from '../assets/images/logo-edite-ajuste.png'; // Verifique se o caminho da sua imagem está correto
import { NavLink } from 'react-router-dom'; // 4. Importamos NavLink para controle de link ativo

// 2. Removemos as props antigas de estado, agora ele só recebe o título
interface HeaderProps {
    titulo: string;
}

const Header = ({ titulo }: HeaderProps) => {
    return (
        <header className={styles.header}>
        
        <div className={styles.headerLeft}>
            {/* 3. A FOTO AGORA É UM BOTÃO QUE LEVA PARA "/" (Dashboard) */}
            <Link to="/" title="Voltar ao Início">
            <img src={logo} alt="Avatar Dona Edite" className={styles.logo} />
            </Link>
            <h1 className={styles.titulo}>{titulo}</h1>
        </div>

        <nav className={styles.headerRight}>
            {/* 4. OS BOTÕES AGORA LEVAM PARA SUAS PRÓPRIAS TELAS */}
            <NavLink to="/doces" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Doces
            </NavLink>
            <NavLink to="/salgados" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                Salgados
            </NavLink>
        </nav>
        
        </header>
    );
};

export default Header;