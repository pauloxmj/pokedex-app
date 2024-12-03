import { useState, useEffect } from 'react'
import PokemonCard from './PokemonCard'
import { getPokemon } from './../services/pokemonApi.js'

export default function AllPokemon(){
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const fetchPokemon = async() => {
            const data = await getPokemon();
            setPokemon(data.results);
        }
        fetchPokemon();
    }, [])

    return(
        <div>
            {pokemon.map((pokemon, index) => (
                <PokemonCard
                    key={index}
                    name={pokemon.name}
                    url={pokemon.url}
                    id={index + 1}
                />
                ))}
        </div>

    )
}