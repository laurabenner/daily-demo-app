import { useState } from "react";
import { findAnimal } from "../utils";
import { Time } from "./Time";
import { Exhibit } from "./Exhibit";
import { Description } from "./Description";
import { Star } from "./Star";
import { AnimalList } from "./AnimalList";
import { AnimalDropdown } from "./AnimalDropdown";

export function Demo({ demo }) {
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
                <Star />
                <Exhibit exhibit={demo.Exhibit} />
                {animals.length > 0 && <AnimalList animals={animals} exhibit={demo.Exhibit} updateAnimal={updateAnimal} />}
            </div>
            {animal && <AnimalDropdown animal={animal} />}
        </div>
    );
}