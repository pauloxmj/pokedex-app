import pokedexLogo from './../assets/images/pokedex.png'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.container}>
            <img src={pokedexLogo} alt="Pokedex" />
        </header>
    )
}