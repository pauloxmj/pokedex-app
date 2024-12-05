import styles from './PokemonDetails.module.css';

export default function PokemonDetails({ pokemon, onClose, onEvolutionClick }) {

    // Close modal when the area outside it is clicked
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={styles.container} onClick={handleBackgroundClick}>
            <div className={styles.modalContent}>
                <div className={styles.generalInfo}>
                    <h1> #{pokemon.id}</h1>
                    <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                    <h2>{pokemon.genus}</h2>
                    <img className={styles.pokeImage} src={pokemon.sprite} alt={pokemon.name} />
                    <div className={styles.types}>
                        {pokemon.types.map((type, index) => (
                        <img
                            key={index}
                            src={`https://raw.githubusercontent.com/msikma/pokeresources/master/resources/type-icons/gen8/${type}.svg`}
                            alt={type}
                        />
                        ))}
                    </div>
                    <p><strong>Height:</strong> {pokemon.height} dm</p>
                    <p><strong>Weight:</strong> {pokemon.weight} hg</p>
                </div>
                <div className={styles.secondaryInfo}>
                    <div className={styles.aboutContainer}>
                        <h3>About</h3>
                        <p>{pokemon.flavorText}</p>
                        <h3>Base Stats</h3>
                        {pokemon.baseStats.map((stat, index) => (
                            <li key={index}>
                                {stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </div>
                    <div className={styles.evolutionsContainer}>
                        <h3>Evolutions</h3>
                        <div>
                            {pokemon.evolutions.map((evolution, index) => (
                                <div
                                    key={index}
                                    onClick={() => onEvolutionClick (evolution.id)}
                                    className={styles.evolution}
                                >
                                    <img src={evolution.sprite} alt={evolution.name} />
                                    <p>{evolution.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
