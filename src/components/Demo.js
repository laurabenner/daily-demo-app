import { transformExhibitString } from "../utils";
import { findAnimal } from "../utils";
import { Time } from "./Time";
import { Exhibit } from "./Exhibit";
import { Description } from "./Description";

export function Demo({ demo }) {
    let animals = [];

    for (const animal of demo.Animals) {
        animals.push(findAnimal(animal));
    }
        
    return (
        <div
            className="demo bg-demo p-4 m-2 border rounded-xl border-transparent w-11/12 lg:w-4/6 justify-self-center grid grid-cols-12"
            data-exhibit={transformExhibitString(demo.Exhibit)}
        >
            <Time time={demo.Time} />
            <Exhibit exhibit={demo.Exhibit} />
            <Description description={demo.Demo} />
        </div>
    );
}