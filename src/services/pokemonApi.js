const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemon = async() => {
    const res = await fetch(`${API_URL}?limit=24`);
    const data = await res.json();

    // Fetch details for each Pokémon using the url key
    const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
            const pokemonRes = await fetch(pokemon.url);
            const pokemonData = await pokemonRes.json();
            return {
                id: pokemonData.id,
                name: pokemonData.name,
                types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
                sprite: pokemonData.sprites.other["official-artwork"].front_default,
                speciesUrl: pokemonData.species.url
            };
        })
    );

    return detailedPokemon;
};

// Fetch more pokemon using offset to ensure only new pokemon are fetched
export const getMorePokemon = async(offset) => {
    const res = await fetch(`${API_URL}?offset=${offset}&limit=24`)
    const data = await res.json();

    const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
            const pokemonRes = await fetch(pokemon.url);
            const pokemonData = await pokemonRes.json();
            return {
                id: pokemonData.id,
                name: pokemonData.name,
                types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
                sprite: pokemonData.sprites.other["official-artwork"].front_default,
                speciesUrl: pokemonData.species.url
            };
        })
    );

    return detailedPokemon;
}

// Fetch detailed information from the pokemon-species page
export const getPokemonDetails = async (pokemonId) => {
    const res = await fetch(`${API_URL}/${pokemonId}`);
    const data = await res.json();
    
    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();

    return {
        name: data.name,
        id: data.id,
        height: data.height,
        weight: data.weight,
        types: data.types.map((typeInfo) => typeInfo.type.name),
        baseStats: data.stats.map((stat) => ({
            name: stat.stat.name,
            base_stat: stat.base_stat,
        })),
        baseExperience: data.base_experience,
        genus: speciesData.genus,
        flavorText: speciesData.flavor_text_entries.find(entry => entry.language.name === "en")?.flavor_text,
        evolutions: await getEvolutionChain(speciesData.evolution_chain.url),
        sprite: data.sprites.other["official-artwork"].front_default,
    };
};

// Fetch pokemon evolution chain details
const getEvolutionChain = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    let chain = [];
    let currentEvo = data.chain;

    while (currentEvo) {
        chain.push({
            name: currentEvo.species.name,
            id: currentEvo.species.url.split("/").slice(-2, -1)[0],
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentEvo.species.url.split("/").slice(-2, -1)[0]}.png`,
        });
        currentEvo = currentEvo.evolves_to[0];
    }

    return chain;
};