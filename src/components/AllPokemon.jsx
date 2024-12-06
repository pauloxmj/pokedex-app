import { useState, useEffect, useRef, useCallback } from 'react';
import { getPokemon, getMorePokemon, getPokemonDetails } from './../services/pokemonApi.js';
import PokemonCard from './PokemonCard';
import PokemonDetails from './PokemonDetails.jsx';
import styles from './AllPokemon.module.css';

export default function AllPokemon({ selectedType, searchQuery }) {
  const [pokemonList, setPokemonList] = useState([]); // state to store pokemon data
  const [offset, setOffset] = useState(24); // state to keep track of the fetch request offset
  const [isLoading, setIsLoading] = useState(false); // state to detect if new pokemon are being loaded
  const [selectedPokemon, setSelectedPokemon] = useState(null); // state to keep track of the selected pokemon

  // useRef to be used with the useEffect function to enable infinite scroll
  const loaderRef = useRef();

  // Fetch initial pokemon
  useEffect(() => {
    const fetchInitialPokemon = async () => {
      const fetchedPokemon = await getPokemon();
      setPokemonList(fetchedPokemon);
    };
    fetchInitialPokemon();
  }, []);

  // Function to trigger the fetch for more pokemon and set it to the pokemon state to be rendered
  const fetchMorePokemon = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    const morePokemon = await getMorePokemon(offset);

    setPokemonList((previousPokemonList) => [...previousPokemonList, ...morePokemon]);

    setOffset((previousOffset) => previousOffset + 24);
    setIsLoading(false);
  }, [offset, isLoading]);

  // Handle click on card to show pokemon details
  const handlePokemonClick = async (pokemonId) => {
    const pokemonDetails = await getPokemonDetails(pokemonId);
    setSelectedPokemon(pokemonDetails);
  };

  // Handle click on evolution to update the modal and show the evolution's details
  const handleEvolutionClick = async (evolutionId) => {
    const evolutionDetails = await getPokemonDetails(evolutionId);
    setSelectedPokemon(evolutionDetails); 
  };

  // Close the modal when clicking outside it
  const handleClose = () => {
    setSelectedPokemon(null); 
  };

  // useEffect for infinite scroll, when the scroll reaches the loaderRef, it triggers the fetchMorePokemon function
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

  // Filter pokemon by selected type and search query
  const filteredPokemonList = pokemonList.filter((pokemonItem) => {
    const isTypeMatch = selectedType ? pokemonItem.types.includes(selectedType) : true;
    const isSearchMatch = pokemonItem.name.toLowerCase().includes(searchQuery.toLowerCase());
    return isTypeMatch && isSearchMatch;
  });

  return (
    <div className={styles.container}>
      <ul className={styles.pokemonList}>
        {filteredPokemonList.map((pokemonItem, index) => (
          <li key={index} className={styles.pokemonItem}>
            <PokemonCard pokemon={pokemonItem} onClick={handlePokemonClick} />
          </li>
        ))}
      </ul>

      {/* Loading spinner */}
      {/* {isLoading && (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
        </div>
      )} */}

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
