import styles from './PokemonDetails.module.css';

export default function PokemonDetails({ pokemon, onClose }) {

    // Close modal when the area outside it is clicked
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={styles.modal} onClick={handleBackgroundClick}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeBtn}>X</button>
                <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <img src={pokemon.sprite} alt={pokemon.name} />
                <p><strong>Number:</strong> #{pokemon.id}</p>
                <p><strong>Height:</strong> {pokemon.height} dm</p>
                <p><strong>Weight:</strong> {pokemon.weight} hg</p>
                <p><strong>Genus:</strong> {pokemon.genus}</p>
                <p><strong>Flavor Text:</strong> {pokemon.flavorText}</p>

                <h3>Types</h3>
                <div className={styles.types}>
                    {pokemon.types.map((type, index) => (
                        <span key={index}>{type}</span>
                    ))}
                </div>

                <h3>Base Stats</h3>
                <ul>
                    {pokemon.baseStats.map((stat, index) => (
                        <li key={index}>
                            {stat.name}: {stat.base_stat}
                        </li>
                    ))}
                </ul>

                <h3>Evolutions</h3>
                <div className={styles.evolutions}>
                    {pokemon.evolutions.map((evolution, index) => (
                        <div
                            key={index}
                            onClick={() => onClose(evolution.id)}
                            className={styles.evolution}
                        >
                            <img src={evolution.sprite} alt={evolution.name} />
                            <p>{evolution.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
