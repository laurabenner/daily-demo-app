import { transformExhibitString } from "../utils";
import { spliceTags } from "../utils";
import { getPointLink } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

/**
 * @param {string} exhibit Zoo exhibit
 * @returns Icons and links to exhibit page and map
 */
export function ExhibitHeading({ exhibit, location }) {
    return (
        <div className={"mt-4 ml-6 w-11/12 lg:w-4/6 justify-self-center text-2xl font-bold"}>
            <h2 className="block sm:inline-block text-palette-dark">
                <FontAwesomeIcon icon={faLocationDot} />
                <a
                    className={"underline pl-2"}
                    // Link to zoo exhibit page
                    href={"https://nationalzoo.si.edu/animals/exhibits/"
                        + transformExhibitString(exhibit).replace("africa-trail", "cheetah-conservation-station")}
                    target="_blank"
                    rel="noreferrer">
                    {spliceTags(exhibit)}
                </a>
            </h2>
            <p className="text-palette-brown mr-2.5 text-base font-normal inline-block sm:float-right">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
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