import './App.css';
import { useState } from "react";
import { DemoGrid } from "./components/DemoGrid";
import { Select } from "./components/Select";
import { PopUp } from "./components/PopUp";

function App() {
  // Holds state of exhibit filter
  const [filter, setFilter] = useState("All Exhibits");

  // Holds state of sort type
  const [sort, setSort] = useState("Time");

  // Holds state of pop-up display
  const [popped, setPopped] = useState(false);

  // Holds state of favorited demos
  const [favorites, setFavorites] = useState([]);

  const updateFilter = (newValue) => {
    setFilter(newValue);
  };

  const updateSort = (newValue) => {
    setSort(newValue);
  };

  const updatePopped = (newValue) => {
    setPopped(newValue);
  }

  const updateFavorites = (favorite) => {
    // Reset favorites 
    if (favorite === "clear") {
      setFavorites([]);
    } else {
      // Get index of passed demo in favorites array
      const index = favorites.indexOf(favorite);

      if (index !== -1) {
        // If demo is already in favorites, remove it
        const updatedFavorites = [...favorites];
        updatedFavorites.splice(index, 1);
        setFavorites(updatedFavorites);
      } else {
        // If demo is not yet in favorites, add it
        const updatedFavorites = [...favorites, favorite];
        setFavorites(updatedFavorites);
      }
    }
  };

  // If popped is true, blur the background
  let blur = popped ? "blur-lg" : "blur-none";

  // If popped is true, disable page scroll
  let overflow = popped ? " overflow-hidden" : " overflow-scroll";

  return (
    <>
      <div className={"font-poppins h-screen " + blur + overflow}>
        <header className="text-center bg-[url('../peru-forest-aerial.jpg')] bg-cover bg-bottom py-6 md:pt-24 md:pb-10">
          <h1 className="text-white text-3xl">Daily Animal Demos</h1>
        </header>
        <div className="filters text-center">
          <Select onChange={updateFilter} options={["All Exhibits", "Africa Trail", "Amazonia", "American Bison", "American Trail", "Asia Trail", "Bird House", "Claws & Paws Pathway", "Elephant Trails", "Great Cats", "Kids' Farm", "Primates", "Reptile Discovery Center", "Small Mammal House"]} showSmall={false}/>
          <Select onChange={updateSort} options={["Sort By Time", "Sort By Exhibit"]} showSmall={true}/>
          <button onClick={() => updatePopped(true)} className="text-palette border-2 border-palette-brown rounded-full px-5 py-2.5 m-2">{"Favorites (" + favorites.length + ")"} </button>
        </div>

        <DemoGrid
          filter={filter}
          sort={sort}
          updateFavorites={updateFavorites}
          favorites={favorites}
        />
        <footer className="m-4"></footer>
      </div>

      {/*If popped is true, create overlay over page content to disable clicking outside the pop-up*/}
      {popped && <div className="absolute top-0 left-0 w-screen z-40 h-screen"></div>}

      <PopUp popped={popped} updatePopped={updatePopped} favorites={favorites} updateFavorites={updateFavorites} />
    </>
  );
}

export default App;
