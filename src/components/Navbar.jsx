import { useState } from 'react';
import styles from './Navbar.module.css';

// List of Pokémon types for the filter (can be expanded as needed)
const types = [
  'bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 
  'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 
  'steel', 'water'
];

export default function Navbar({ onTypeFilterChange, onSearchQueryChange, searchQuery, selectedType }) {

  // Handle the change in the search input field
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    onSearchQueryChange(query);  // Update the search query in the parent (App)
  };

  // Handle the change in the Pokémon type selection
  const handleTypeSelectionChange = (event) => {
    const type = event.target.value;
    onTypeFilterChange(type);  // Pass the selected type to the parent (App)
  };

  return (
    <nav className={styles.container}>
        <div>
            <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search Pokémon"
            className={styles.searchInput}
            />
        </div>
        <div className={styles.dropdown}>
            <select 
            value={selectedType} 
            onChange={handleTypeSelectionChange} 
            className={styles.select}
            >
            <option value="">All Types</option>
            {types.map((type) => (
                <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
            ))}
            </select>
        </div>
    </nav>
  );
}