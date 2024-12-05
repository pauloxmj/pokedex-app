import { useState, useEffect, useRef, useCallback } from 'react';
import { getPokemon, getMorePokemon, getPokemonDetails } from './../services/pokemonApi.js';
import PokemonCard from './PokemonCard';
import PokemonDetails from './PokemonDetails.jsx'
import styles from './AllPokemon.module.css';

export default function AllPokemon() {
    const [pokemon, setPokemon] = useState([]); //state to store pokemon data
    const [offset, setOffset] = useState(24); //state to keep track of the offset
    const [isLoading, setIsLoading] = useState(false); //state to detect if new pokemon are being loaded to add to the infinite scroll useEffect
    const [selectedPokemon, setSelectedPokemon] = useState(null); //state to keep track of which pokemon is selected for more info

    // useRef to be used with the useEffect function to enable infinite scroll
    const loaderRef = useRef();

    // Fetch initial pokemon
    useEffect(() => {
        const fetchInitialPokemon = async () => {
            const data = await getPokemon();
            setPokemon(data);
        };
        fetchInitialPokemon();
    }, []);

    // function to trigger the fetch for more pokemon and set it to the pokemon useState to be rendered
    const fetchMorePokemon = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
    
        const morePokemon = await getMorePokemon(offset);
    
        setPokemon((prevPokemon) => [...prevPokemon, ...morePokemon]);
    
        setOffset((prevOffset) => prevOffset + 24);
        setIsLoading(false);
    }, [offset, isLoading]);

    const handlePokemonClick = async (id) => {
        const pokemonDetails = await getPokemonDetails(id);
        setSelectedPokemon(pokemonDetails);
    };

    const handleEvolutionClick = async (evolutionId) => {
        const evolutionDetails = await getPokemonDetails(evolutionId);
        setSelectedPokemon(evolutionDetails); // Update the modal to show the evolution's details
    };

    const handleClose = () => {
    setSelectedPokemon(null); // Close the modal by clearing the selected Pokémon
    };

    // useEffect for infinite scroll, when the scroll reaches the the loaderRef added to the div,
    // it triggers the fetchMorePokemon function to load more pokemon
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchMorePokemon();
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [fetchMorePokemon]);

    return (
        <div className={styles.container}>
            <ul className={styles.pokemonList}>
                {pokemon.map((pokemon, index) => (
                    <li key={index} className={styles.pokemonItem}>
                        <PokemonCard
                            pokemon= {pokemon}
                            onClick= {handlePokemonClick} 
                        />
                    </li>
                ))}
            </ul>

            {/* Loading spinner */}
            {isLoading && (
                <div className={styles.loader}>
                    <div className={styles.spinner}></div>
                </div>
            )}

            {/* Invisible div with ref for triggering the next fetch */}
            <div ref={loaderRef} className={styles.loaderTrigger}></div>

            {/* Modal with PokemonDetails */}
            {selectedPokemon && (
                <PokemonDetails
                    pokemon={selectedPokemon}
                    onEvolutionClick={handleEvolutionClick}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}