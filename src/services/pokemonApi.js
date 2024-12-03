const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

export const getPokemon = async() => {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
}

export const getMorePokemon = async(offset) => {
    const res = await fetch(`${API_URL}?offset=${offset}&limit=20`);
    const data = await res.json();
    return data.results;
}