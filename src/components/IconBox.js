import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { transformExhibitString } from "../utils";

export function IconBox({ animals, exhibit, updateAnimal }) {
    const darkColorTextClass = "text-" + transformExhibitString(exhibit) + "-dark";
    const defaultColorTextClass = "text-" + transformExhibitString(exhibit);

    function handleClick(animal) {
        updateAnimal(animal);
    }

    return (
        <div className={"col-start-4 sm:col-start-3 col-end-12"}>
            <p className={"inline-block pr-2 " + defaultColorTextClass}>
                <FontAwesomeIcon icon={faLocationDot} />
                <a
                    className={"hover:underline p-2.5"}
                    href={"https://nationalzoo.si.edu/animals/exhibits/"
                        + transformExhibitString(exhibit).replace("africa-trail", "cheetah-conservation-station")}
                    target="_blank"
                    rel="noreferrer">
                    {exhibit}
                </a>
            </p>
            <p className="inline-block pr-2 text-gray-400">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                <a
                    className={"hover:underline p-2.5"}
                    href="google.com/maps"
                    target="_blank"
                    rel="noreferrer">
                    Get directions
                </a>
            </p>
            {
                animals.length > 0 && (
                    <p className={"inline-block pr-2 " + darkColorTextClass}>
                        <FontAwesomeIcon icon={faPaw} />
                        <span className="p-2.5">
                            {animals.map((animal, index) => {
                                return (
                                    <button
                                        key={animal.label}
                                        onClick={() => handleClick(animal)}
                                        className="hover:underline mr-1"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {animal.label + (index < animals.length - 1 ? ", " : "")}
                                    </button>
                                );
                            })}
                        </span>
                    </p>
                )
            }
        </div>
    );
}