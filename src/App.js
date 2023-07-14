import './App.css';
import { useState } from "react";
import { DemoGrid } from "./components/DemoGrid";
import { Select } from "./components/Select";

function App() {
  const [filterExhibit, setFilterExhibit] = useState("All Exhibits");
  const [sort, setSort] = useState("Time");
  const [favorites, setFavorites] = useState([]);

  const updateFilterExhibit = (newValue) => {
    setFilterExhibit(newValue);
  };

  const updateSort = (newValue) => {
    setSort(newValue);
  };

  const updateFavorites = (favorite) => {
    const index = favorites.indexOf(favorite);

    if (index !== -1) {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, favorite];
      setFavorites(updatedFavorites);
    }
    console.log(favorites);
  };

  return (

    <div className="font-poppins">
      <header className="text-center bg-asia-trail py-4 md:pt-24 md:pb-10">
        <h1 className="text-white text-3xl">Daily Animal Demos</h1>
      </header>
      <article>
        <div className="filters text-center">
          <Select onChange={updateFilterExhibit} options={["All Exhibits", "Africa Trail", "Amazonia", "American Bison", "American Trail", "Asia Trail", "Bird House", "Claws & Paws Pathway", "Elephant Trails", "Great Cats", "Kids' Farm", "Primates", "Reptile Discovery Center", "Small Mammal House"]} />
          <Select onChange={updateSort} options={["Sort By Time", "Sort By Exhibit"]} />
        </div>

        <DemoGrid
          filterExhibit={filterExhibit}
          sort={sort}
          updateFavorites={updateFavorites}
        />
      </article>

      <footer className="m-4"></footer>
    </div>
  );
}

export default App;
