import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { transformExhibitString } from "../utils";

export function IconBox({ animals, exhibit, animalSelected , updateAnimal, showExhibit }) {
    function handleClick(animal) {
        updateAnimal(animal);
    }

    return (
        <div className={"col-start-4 sm:col-start-3 col-end-13"}>
            {
                showExhibit &&
                <p className={"inline-block pr-2 text-palette-dark"}>
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
                <p className="inline-block pr-2 text-palette-brown">
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
                animals.map(animal => {
                    return (
                        <p key={animal.label} className="inline-block pr-2 text-palette-dark">
                            <span className="hidden md:inline">
                                {animalSelected === animal ? <FontAwesomeIcon icon={faCaretUp} size="xl" /> : <FontAwesomeIcon icon={faCaretDown} size="xl" />}
                            </span>
                            <span className="inline md:hidden"><FontAwesomeIcon icon={faPaw} /></span>
                            <button
                                onClick={() => handleClick(animal)}
                                className="px-2.5 hidden md:inline"
                            >
                                {animal.label}
                            </button>
                            <a
                                className="hover:underline px-2.5 inline md:hidden"
                                href={animal.path}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {animal.label}
                            </a>
                        </p>
                    );
                })
            }
        </div>
    );
}