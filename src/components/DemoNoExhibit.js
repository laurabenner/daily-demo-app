import { useState } from "react";
import { findAnimal } from "../utils";
import { AnimalDropdown } from "./AnimalDropdown";
import { Time } from "./Time";
import { Description } from "./Description";
import { Star } from "./Star";
import { IconBox } from "./IconBox";

export function DemoNoExhibit({ demo, updateFavorites }) {
    const [animal, setAnimal] = useState("");

    const updateAnimal = (newAnimal) => {
        setAnimal(newAnimal);
    }

    let animals = [];

    for (const animal of demo.Animals) {
        animals.push(findAnimal(animal));
    }

    return (

        <div className="w-11/12 lg:w-4/6 m-2 justify-self-center grid">
            <div
                className={"demo bg-demo p-4 border rounded-xl border-transparent grid grid-cols-12 gap-y-2.5" + (animal ? " rounded-br-none" : "")}
            >
                <Time time={demo.Time} />
                <Description description={demo.Demo} />
                <Star onClick={updateFavorites} demo={demo}/>
                <IconBox exhibit={demo.Exhibit} animals={animals} updateAnimal={updateAnimal} />
            </div>
            {animal && <AnimalDropdown animal={animal} />}
        </div>
    );
}