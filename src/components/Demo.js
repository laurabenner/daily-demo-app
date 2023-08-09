import { useState } from "react";
import { findAnimals } from "../utils";
import { Time } from "./Time";
import { Description } from "./Description";
import { Star } from "./Star";
import { IconBox } from "./IconBox";
import { AnimalDropdown } from "./AnimalDropdown";

/**
 * Component to display demo information.
 * @param {object} demo - Contains information about the demo to be displayed
 * @param {function} updateFavorites - Function to update the favorites array
 * @param {array} favorites - Favorited demos
 * @param {boolean} showExhibit - True if exhibit should be displayed
 * @param {array} animalData - Array of animal data
 * @returns JSX element containing demo information
 */
export function Demo({ demo, favorites, updateFavorites, showExhibit, animalData }) {
    // State of current animal showing in dropdown
    const [animalSelected, setAnimalSelected] = useState("");

    // Function to update the currently selected animal
    const updateAnimalSelected = (newAnimal) => {
        if (newAnimal === animalSelected) {
            setAnimalSelected(""); // Clear the selected animal if it's the same as the current one
        } else {
            setAnimalSelected(newAnimal); // Set the selected animal to the new one
        }
    }

    // Populate animals array with animals mentioned in demo label
    let animals = findAnimals(demo.label, demo.exhibit, animalData);

    return (
        <div className="m-4 grid">
            <div
                className={"demo bg-demo p-4 shadow-md rounded-xl border-transparent grid grid-cols-12 gap-y-2.5" + (animalSelected ? " rounded-br-none" : "")}
            >
                <Time time={demo.time} />
                <Description description={demo.label} />
                <Star demo={demo} favorites={favorites} updateFavorites={updateFavorites} />
                <IconBox exhibit={demo.exhibit} location={demo.location} animals={animals} animalSelected={animalSelected} updateAnimalSelected={updateAnimalSelected} showExhibit={showExhibit}/>
            </div>
            {animalSelected && <AnimalDropdown animalSelected={animalSelected} updateAnimalSelected={updateAnimalSelected}/>}
        </div>
    );
}
