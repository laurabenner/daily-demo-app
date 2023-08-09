import { transformExhibitString } from "../utils";
import { spliceTags } from "../utils";
import { getPointLink } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

/**
 * Component for displaying exhibit heading with icons and links to exhibit page and map.
 * @param {string} exhibit - Zoo exhibit
 * @param {string} location - Location of the exhibit
 * @param {boolean} mapView - Flag indicating if map view is enabled
 * @returns JSX element containing exhibit heading
 */
export function ExhibitHeading({ exhibit, location, mapView }) {
    // Determine Tailwind CSS classes based on mapView prop
    const directionsClass = mapView ? "xl:float-right" : "inline-block sm:float-right";

    return (
        <div id={spliceTags(exhibit)} className={"mt-4 ml-6 text-2xl font-bold"}>
            <h2 className="block sm:inline-block text-palette-dark">
                <FontAwesomeIcon icon={faLocationDot} />
                <a
                    className={"underline pl-2"}
                    href={"https://nationalzoo.si.edu/animals/exhibits/"
                        + transformExhibitString(exhibit).replace("africa-trail", "cheetah-conservation-station")}
                    target="_blank"
                    rel="noreferrer">
                    {spliceTags(exhibit)}
                </a>
            </h2>
            <p className={`text-palette-brown mr-2.5 text-base font-normal ${directionsClass}`}>
                <button onClick={() => window.open(getPointLink(location), "_blank")}>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </button>
                <a
                    className={"underline p-2.5"}
                    href={getPointLink(location)}
                    target="_blank"
                    rel="noreferrer">
                    Get directions
                </a>
            </p>
        </div>
    );
}
