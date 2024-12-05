import { useState, useEffect, useRef, useCallback } from 'react';
import PokemonCard from './PokemonCard';
import { getPokemon, getMorePokemon } from './../services/pokemonApi.js';
import styles from './AllPokemon.module.css';

export default function AllPokemon() {
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const loaderRef = useRef();

    // Fetch initial pokemon
    useEffect(() => {
        const fetchInitialPokemon = async () => {
            const data = await getPokemon();
            setPokemon(data);
        };
        fetchInitialPokemon();
    }, []);

    // Fetch more pokemon when infinite scroll useEffect is triggered
    const fetchMorePokemon = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
    
        const morePokemon = await getMorePokemon(offset);
    
        setPokemon((prevPokemon) => [...prevPokemon, ...morePokemon]);
    
        setOffset((prevOffset) => prevOffset + 24);
        console.log(offset);
        setIsLoading(false);
    }, [offset, isLoading]);

    // useEffect for infinite scroll
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
                            name={pokemon.name}
                            id={pokemon.id}
                            types={pokemon.types}
                            sprite={pokemon.sprite}
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
        </div>
    );
}