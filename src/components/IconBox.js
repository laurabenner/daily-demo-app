import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { transformExhibitString } from "../utils";

/**
 * 
 * @param {array} animals Demo animals
 * @param {string} exhibit Demo exhibit
 * @param {object} animalSelected Contains info of animal dropdown currently open
 * @param {function} updateAnimal Function to update animal
 * @param {boolean} showExhibit True if exhibit info should be displayed
 * @returns 
 */
export function IconBox({ animals, exhibit, animalSelected, updateAnimal, showExhibit }) {

    // When an animal is clicked, update animal
    function handleClick(animal) {
        updateAnimal(animal);
    }

    return (
        <div className={"col-start-4 sm:col-start-3 col-end-13"}>
            {
                // Conditionally render exhibit icon and link
                showExhibit &&
                <p className={"inline-block pr-2 text-palette-dark"}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <a
                        className={"underline p-2.5"}
                        href={"https://nationalzoo.si.edu/animals/exhibits/"
                            + transformExhibitString(exhibit).replace("africa-trail", "cheetah-conservation-station")}
                        target="_blank"
                        rel="noreferrer">
                        {exhibit}
                    </a>
                </p>
            }
            {
                // Conditionally render directions icon and link
                showExhibit &&
                <p className="inline-block pr-2 text-palette-brown">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    <a
                        className={"underline p-2.5"}
                        href="google.com/maps"
                        target="_blank"
                        rel="noreferrer">
                        Get directions
                    </a>
                </p>
            }
            {
                // Conditionally render animals icons and links
                animals.length > 0 &&
                animals.map(animal => {
                    return (
                        <p key={animal.label} className="inline-block pr-2 text-palette-dark">
                            {/*Display caret icon when dropdown click action is in use*/}
                            <span className="hidden md:inline">
                                {animalSelected === animal ? <FontAwesomeIcon icon={faCaretUp} size="xl" /> : <FontAwesomeIcon icon={faCaretDown} size="xl" />}
                            </span>

                            {/*Display paw icon when link is in use*/}
                            <span className="inline md:hidden"><FontAwesomeIcon icon={faPaw} /></span>

                            {/*Button is hidden when screen is smaller than 768px*/}
                            <button
                                onClick={() => handleClick(animal)}
                                className="px-2.5 hidden md:inline"
                            >
                                {animal.label}
                            </button>

                            {/*Link is hidden when screen is larger than 768px*/}
                            <a
                                className="underline px-2.5 inline md:hidden"
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