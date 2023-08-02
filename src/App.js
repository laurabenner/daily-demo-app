import './App.css';
import { useState, useEffect, useCallback } from "react";
import { DemoGrid } from "./components/DemoGrid";
import { Select } from "./components/Select";
import { PopUp } from "./components/PopUp";

// Constants for exhibit and sort options
const EXHIBIT_OPTIONS = ["All Exhibits", "Africa Trail", "Amazonia", "American Bison", "American Trail", "Asia Trail", "Bird House", "Claws & Paws Pathway", "Elephant Trails", "Great Cats", "Kids' Farm", "Primates", "Reptile Discovery Center", "Small Mammal House"];
const SORT_OPTIONS = ["Sort By Time", "Sort By Exhibit"];

function App() {
  const [filter, setFilter] = useState('All Exhibits');
  const updateFilter = useCallback((newValue) => {
    setFilter(newValue);
  }, []);

  const [sort, setSort] = useState('Time');
  const updateSort = useCallback((newValue) => {
    setSort(newValue);
  }, []);

  const [popped, setPopped] = useState(false);
  const updatePopped = useCallback((newValue) => {
    setPopped(newValue);
  }, []);

  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const updateFavorites = useCallback((favorite) => {
    // Reset favorites
    if (favorite === "clear") {
      setFavorites([]);
    } else {
      // Get index of passed demo in favorites array
      const index = favorites.findIndex(
        (f) =>
          f.label === favorite.label &&
          f.time === favorite.time &&
          f.exhibit === favorite.exhibit
      );

      if (index !== -1) {
        // If demo is already in favorites, remove it
        const updatedFavorites = favorites.filter((_, i) => i !== index);
        setFavorites(updatedFavorites);
      } else {
        // If demo is not yet in favorites, add it
        const updatedFavorites = [...favorites, favorite];
        setFavorites(updatedFavorites);
      }
    }
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const blurClass = popped ? "blur-lg" : "blur-none";
  const overflowClass = popped ? "overflow-hidden" : "overflow-scroll";

  return (
    <>
      <div className={`font-poppins scroll-smooth h-screen ${blurClass} ${overflowClass}`}>
        <header className="text-center bg-[url('../peru-forest-aerial.jpg')] bg-cover bg-bottom py-6 md:pt-24 md:pb-10">
          <h1 className="text-white text-3xl">Daily Animal Demos</h1>
        </header>
        <div className="filters text-center">
          <Select onChange={updateFilter} options={EXHIBIT_OPTIONS} showSmall={false} />
          <Select onChange={updateSort} options={SORT_OPTIONS} showSmall={true} />
          <button className="text-palette border-2 border-palette-brown rounded-full px-5 py-2.5 m-2" onClick={() => updatePopped(true)}>
            {`Favorites (${favorites.length})`}
          </button>
        </div>
        <DemoGrid filter={filter} sort={sort} favorites={favorites} updateFavorites={updateFavorites} />
        <footer className="m-4"></footer>
      </div>

      {popped && <div className="absolute top-0 left-0 w-screen z-40 h-screen"></div>}

      <PopUp popped={popped} updatePopped={updatePopped} favorites={favorites} updateFavorites={updateFavorites} />
    </>
  );
}

export default App;

