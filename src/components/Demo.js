import { useState } from "react";
import { findAnimals } from "../utils";
import { Time } from "./Time";
import { Description } from "./Description";
import { Star } from "./Star";
import { IconBox } from "./IconBox";
import { AnimalDropdown } from "./AnimalDropdown";

/**
 * @param {object} demo Contains information about the demo to be displayed
 * @param {function} updateFavorites Function to update the favorites array
 * @param {array} favorites Favorited demos
 * @param {boolean} showExhibit True if exhibit should be displayed
 * @returns Display of demo information
 */
export function Demo({ demo, updateFavorites, favorites, showExhibit, animalData }) {
    // Holds state of current animal showing in dropdown
    const [animal, setAnimal] = useState("");

    // Sets animal to empty string if new animal matches current animal; otherwise, sets to new animal
    const updateAnimal = (newAnimal) => {
        if (newAnimal === animal) {
            setAnimal("");
        } else {
            setAnimal(newAnimal);
        }
    }

    // Adds animal data to animal array for each animal involved in the demo
    let animals = findAnimals(demo.label, demo.exhibit, animalData);

    return (
        <div className="m-4 grid">
            <div
                className={"demo bg-demo p-4 shadow-md rounded-xl border-transparent grid grid-cols-12 gap-y-2.5" + (animal ? " rounded-br-none" : "")}
            >
                <Time time={demo.time} />
                <Description description={demo.label} />
                <Star onClick={updateFavorites} demo={demo} favorites={favorites} />
                <IconBox exhibit={demo.exhibit} location={demo.location} animals={animals} animalSelected={animal} updateAnimal={updateAnimal} showExhibit={showExhibit}/>
            </div>
            {animal && <AnimalDropdown animal={animal} updateAnimal={updateAnimal}/>}
        </div>
    );
}