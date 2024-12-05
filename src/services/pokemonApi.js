const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemon = async() => {
    const res = await fetch(`${API_URL}?limit=24`);
    const data = await res.json();

    // Fetch details for each Pokémon using the `url` key
    const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
            const pokemonRes = await fetch(pokemon.url);
            const pokemonData = await pokemonRes.json();
            return {
                id: pokemonData.id,
                name: pokemonData.name,
                types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
                sprite: pokemonData.sprites.front_default
            };
        })
    );

    return detailedPokemon;
}

export const getMorePokemon = async(offset) => {
    const res = await fetch(`${API_URL}?offset=${offset}&limit=24`)
    const data = await res.json();

    // Fetch details for each Pokémon using the `url` key
    const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
            const pokemonRes = await fetch(pokemon.url);
            const pokemonData = await pokemonRes.json();
            return {
                id: pokemonData.id,
                name: pokemonData.name,
                types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
                sprite: pokemonData.sprites.front_default
            };
        })
    );

    return detailedPokemon;
}