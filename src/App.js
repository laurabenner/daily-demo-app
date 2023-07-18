import './App.css';
import { useState } from "react";
import { DemoGrid } from "./components/DemoGrid";
import { Select } from "./components/Select";
import { Popper } from "./components/Popper";

function App() {
  const [filterExhibit, setFilterExhibit] = useState("All Exhibits");
  const [sort, setSort] = useState("Time");
  const [favorites, setFavorites] = useState([]);
  const [popped, setPopped] = useState(false);

  const updateFilterExhibit = (newValue) => {
    setFilterExhibit(newValue);
  };

  const updateSort = (newValue) => {
    setSort(newValue);
  };

  const updateFavorites = (favorite) => {
    if (favorite === "clear") {
      setFavorites([]);
    } else {
      const index = favorites.indexOf(favorite);

      if (index !== -1) {
        const updatedFavorites = [...favorites];
        updatedFavorites.splice(index, 1);
        setFavorites(updatedFavorites);
      } else {
        const updatedFavorites = [...favorites, favorite];
        setFavorites(updatedFavorites);
      }
    }
  };

  const updatePopped = (newValue) => {
    setPopped(newValue);
  }

  let blur = popped ? "blur-lg" : "blur-none";

  return (
    <>
      <div className={"font-poppins h-full " + blur}>
        <header className="text-center bg-[url('../peru-forest-aerial.jpg')] bg-cover bg-bottom py-4 md:pt-24 md:pb-10">
          <h1 className="text-white text-3xl">Daily Animal Demos</h1>
        </header>
        <article>
          <div className="filters text-center">
            <Select onChange={updateFilterExhibit} disabled={popped} options={["All Exhibits", "Africa Trail", "Amazonia", "American Bison", "American Trail", "Asia Trail", "Bird House", "Claws & Paws Pathway", "Elephant Trails", "Great Cats", "Kids' Farm", "Primates", "Reptile Discovery Center", "Small Mammal House"]} />
            <Select onChange={updateSort} options={["Sort By Time", "Sort By Exhibit"]} popped={popped}/>
            <button onClick={() => updatePopped(true)} disabled={popped} className="text-palette border-2 border-palette-brown rounded-full px-5 py-2.5 m-2">{"Favorites (" + favorites.length + ")"} </button>
          </div>

          <DemoGrid
            filterExhibit={filterExhibit}
            sort={sort}
            updateFavorites={updateFavorites}
            favorites={favorites}
            popped={popped}
          />

        </article>

        <footer className="m-4"></footer>
      </div>

      <Popper popped={popped} updatePopped={updatePopped} favorites={favorites} updateFavorites={updateFavorites} />
    </>
  );
}

export default App;
