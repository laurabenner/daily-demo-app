import './App.css';
import { useState } from "react";
import { DemoGrid } from "./components/DemoGrid";
import { Select } from "./components/Select";
import { Button } from './components/Button';

function App() {
  const [filterExhibit, setFilterExhibit] = useState("all");
  const [sort, setSort] = useState("Time");

  const updateFilterExhibit = (newValue) => {
    setFilterExhibit(newValue);
  };

  const updateSortTime = () => {
    setSort("Time");
  };

  const updateSortExhibit = () => {
    setSort("Exhibit");
  }

  return (
    <>
      <header className="text-center bg-asia-trail py-4 md:pt-24 md:pb-10">
        <h1 className="text-white text-3xl">Daily Animal Demos</h1>
      </header>
      <article>
        <div className="filters text-center">
          <Select updateFilterExhibit={updateFilterExhibit} />

          <Button onClick={updateSortTime} type={"Time"} sort={sort} text="Sort By Time" />
          <Button onClick={updateSortExhibit} type={"Exhibit"} sort={sort} text="Sort By Exhibit"></Button>

        </div>

        <DemoGrid
          filterExhibit={filterExhibit}
          sort={sort}
        />
      </article>

      <footer className="m-4"></footer>
    </>
  );
}

export default App;
