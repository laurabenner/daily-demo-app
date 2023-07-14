import { transformExhibitString } from "../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export function Exhibit({ exhibit }) {
    const exhibitColorClass = "text-" + transformExhibitString(exhibit);

    return (
        <div className={"col-start-4 sm:col-start-3 col-end-11 row-span-2 " + exhibitColorClass}>
            <p className={"inline"}>
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
            <p className="text-gray-400 inline ml-2.5">
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