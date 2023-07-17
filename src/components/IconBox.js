import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { transformExhibitString } from "../utils";

export function IconBox({ animals, exhibit, updateAnimal, showExhibit }) {
    const darkColorTextClass = "text-" + transformExhibitString(exhibit) + "-dark";
    const defaultColorTextClass = "text-" + transformExhibitString(exhibit);

    function handleClick(animal) {
        updateAnimal(animal);
    }

    return (
        <div className={"col-start-4 sm:col-start-3 col-end-13"}>
            {
                showExhibit &&
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
            }
            {
                showExhibit &&
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
            }
            {
                animals.length > 0 &&
                <p className={"inline-block pr-2 " + darkColorTextClass}>
                    <FontAwesomeIcon icon={faPaw} />
                    <span className="p-2.5">
                        {animals.map((animal, index) => {
                            return (
                                <Fragment key={animal.label}>
                                    <button
                                        onClick={() => handleClick(animal)}
                                        className="hover:underline mr-1 hidden md:inline"
                                    >
                                        {animal.label + (index < animals.length - 1 ? ", " : "")}
                                    </button>
                                    <a
                                        className="hover:underline mr-1 inline md:hidden"
                                        href={animal.path}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {animal.label + (index < animals.length - 1 ? ", " : "")}
                                    </a>
                                </Fragment>
                            );
                        })}
                    </span>
                </p>
            }
        </div>
    );
}