import styles from './PokemonCard.module.css'

export default function PokemonCard({ pokemon, onClick }) {
    return (
        <div onClick={() => onClick(pokemon.id)} className={styles.cardContainer} style={{ cursor: 'pointer' }}>
            <div className={styles.cardHeader}>
                <div className={styles.pokeNumber}>#{pokemon.id}</div>
            </div>
            <img className={styles.sprite} src={pokemon.sprite} alt={pokemon.name} />
            <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <div className={styles.types}>
                {pokemon.types.map((type, index) => (
                    <img
                        key={index}
                        src={`https://raw.githubusercontent.com/msikma/pokeresources/master/resources/type-icons/gen8/${type}.svg`}
                        alt={type}
                    />
                ))}
            </div>
        </div>
    );
}