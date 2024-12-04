import { useState, useEffect, useRef, useCallback } from 'react'
import PokemonCard from './PokemonCard'
import { getPokemon, getMorePokemon } from './../services/pokemonApi.js'
import styles from './AllPokemon.module.css'

export default function AllPokemon(){
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(40);
    const [isLoading, setIsLoading] = useState(false);

    // Ref to trigger fetching for more pokemon
    const loaderRef = useRef();

    // Fetch intial pokemon
    useEffect(() => {
        const fetchInitialPokemon = async() => {
            const data = await getPokemon();
            setPokemon(data.results);
        }
        fetchInitialPokemon();
    }, [])

    // Fetch more pokemon after the initial ones
    const fetchMorePokemon = useCallback(async () => {
        if (isLoading) return; // Prevents duplicate requests
        setIsLoading(true);
        const morePokemon = await getMorePokemon(offset);
        setPokemon((prevPokemon) => [...prevPokemon, ...morePokemon]);
        setOffset((prevOffset) => prevOffset + 40);
        setIsLoading(false);
    }, [offset, isLoading])

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
                            url={pokemon.url}
                            id={index + 1}
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