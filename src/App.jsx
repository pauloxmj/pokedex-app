import { useState } from 'react';
import Header from './components/Header.jsx';
import AllPokemon from './components/AllPokemon.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');  // State for search query
  const [selectedType, setSelectedType] = useState('');  // State for selected Pokémon type

  // Handle changes in the search field/query
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  // Handle changes in the selected Pokémon type
  const handleTypeFilterChange = (type) => {
    setSelectedType(type);
  };

  return (
    <>
      <Header />
      <Navbar 
        onSearchQueryChange={handleSearchQueryChange} 
        onTypeFilterChange={handleTypeFilterChange}
        searchQuery={searchQuery}
        selectedType={selectedType}
      />
      <AllPokemon searchQuery={searchQuery} selectedType={selectedType} />
    </>
  );
}

export default App;