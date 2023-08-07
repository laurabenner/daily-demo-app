import './App.css';
import { useState, useEffect, useCallback } from "react";
import { DemoGrid } from "./components/DemoGrid";
import { Select } from "./components/Select";
import { PopUp } from "./components/PopUp";

// Constants for exhibit and sort options
const EXHIBIT_OPTIONS = ["All Exhibits", "Africa Trail", "Amazonia", "American Bison", "American Trail", "Asia Trail", "Bird House", "Claws & Paws Pathway", "Elephant Trails", "Great Cats", "Kids' Farm", "Primates", "Reptile Discovery Center", "Small Mammal House"];
const SORT_OPTIONS = ['Sort By Time', 'Sort By Exhibit'];

function App() {
  const [filter, setFilter] = useState('All Exhibits');
  const [windowWidth, setWindowWidth] = useState('window.innerWidth');
  const updateFilter = useCallback((newValue) => {
    setFilter(newValue);
  }, []);

  const [sort, setSort] = useState('Sort By Time');
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

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      const thresholdWidth = 1024;

      if ((windowWidth <= thresholdWidth && newWindowWidth > thresholdWidth) ||
        (windowWidth > thresholdWidth && newWindowWidth <= thresholdWidth)) {
        window.location.reload();
      }

      setWindowWidth(newWindowWidth);
    };

    window.addEventListener('resize', handleResize);
  }, [windowWidth]);

  const blurClass = popped ? "blur-lg" : "blur-none";
  const overflowClass = popped || (sort === 'Map View') ? "overflow-hidden" : "overflow-y-scroll";
  const timeButtonClass = sort === 'Sort By Time' ? "text-white bg-palette" : "text-palette bg-white";;
  const exhibitButtonClass = sort === 'Sort By Exhibit' ? "text-white bg-palette" : "text-palette bg-white";;
  const mapButtonClass = sort === 'Map View' ? "text-white bg-palette" : "text-palette bg-white";

  return (
    <>
      <div id="container" className={`flex flex-col h-screen font-poppins ${blurClass} ${overflowClass}`}>
        <header id="header" className="text-center bg-[url('../peru-forest-aerial.jpg')] bg-cover bg-bottom p-4 md:p-16 flex justify-center">
          <h1 className="text-white text-3xl self-center">Daily Animal Demos</h1>
        </header>
        <div id="filters" className="text-center">
          <Select onChange={updateFilter} options={EXHIBIT_OPTIONS} showSmall={false} />
          <Select onChange={updateSort} options={SORT_OPTIONS} showSmall={true} />
          <button onClick={() => updateSort('Sort By Time')} className={`lg:inline hidden border-2 border-palette rounded-l-full px-5 py-2.5 ml-2 my-0 ${timeButtonClass}`}>Sort By Time</button>
          <button onClick={() => updateSort('Sort By Exhibit')} className={`lg:inline hidden border-y-2 border-palette px-5 py-2.5 my-0 ${exhibitButtonClass}`}>Sort By Exhibit</button>
          <button onClick={() => updateSort('Map View')} className={`lg:inline hidden border-2 border-l-none border-palette rounded-r-full px-5 py-2.5 mr-2 my-0 ${mapButtonClass}`}>Map View</button>
          <button className="text-palette bg-white border-2 border-palette rounded-full px-5 py-2.5 m-2" onClick={() => updatePopped(true)}>
            {`Favorites (${favorites.length})`}
          </button>
        </div>
        <DemoGrid filter={filter} sort={sort} favorites={favorites} updateFavorites={updateFavorites} />
        <footer id="footer" className="m-2"></footer>
      </div>

      {popped && <div className="absolute top-0 left-0 w-screen z-40 h-screen"></div>}

      <PopUp popped={popped} updatePopped={updatePopped} favorites={favorites} updateFavorites={updateFavorites} />
    </>
  );
}

export default App;

