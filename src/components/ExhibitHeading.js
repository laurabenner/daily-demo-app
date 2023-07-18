import { transformExhibitString } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export function ExhibitHeading({ exhibit }) {
    return (
        <div className={"mt-4 ml-6 w-11/12 lg:w-4/6 justify-self-center text-2xl font-bold"}>
            <h2 className="block sm:inline-block text-palette-dark">
                <FontAwesomeIcon icon={faLocationDot} />
                <a
                    className={"hover:underline pl-2"}
                    href={"https://nationalzoo.si.edu/animals/exhibits/"
                        + transformExhibitString(exhibit).replace("africa-trail", "cheetah-conservation-station")}
                    target="_blank"
                    rel="noreferrer">
                    {exhibit}
                </a>
            </h2>
            <p className="text-palette-brown mr-2.5 text-base font-normal inline-block sm:float-right">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                <a
                    className={"hover:underline p-2.5"}
                    href="google.com/maps"
                    target="_blank"
                    rel="noreferrer">
                    Get directions
                </a>
            </p>
        </div>
    );
}