const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=40";

export const getPokemon = async() => {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
}

export const getMorePokemon = async(offset) => {
    const res = await fetch(`${API_URL}?offset=${offset}&limit=40`);
    const data = await res.json();
    return data.results;
}