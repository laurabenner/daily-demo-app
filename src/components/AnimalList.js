import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { transformExhibitString } from "../utils";

export function AnimalList({ animals, exhibit, updateAnimal }) {
    const exhibitColorClass = "text-" + transformExhibitString(exhibit) + "-dark";

    function handleClick(animal) {
        updateAnimal(animal);
    }

    return (
        <div className={"col-start-4 sm:col-start-3 col-end-11 row-span-1 " + exhibitColorClass}>
            <FontAwesomeIcon icon={faPaw} />
            <p className="inline p-1.5">
                {animals.map((animal, index) => {
                    console.log(animal.label + (index < animals.length - 1 ? ", " : ""));

                    return (
                        <span key={animal.label}>
                            <button
                                onClick={() => handleClick(animal)}
                                className="hover:underline pr-1"
                                target="_blank"
                                rel="noreferrer">
                                {animal.label + (index < animals.length - 1 ? "," : "")}
                            </button>
                        </span>
                    );
                })}
            </p>
        </div>
    );
}