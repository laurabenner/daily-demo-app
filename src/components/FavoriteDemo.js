import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Star } from "./Star";
import { spliceTags } from "../utils";

/**
 * @param {object} demo Contains information about a scheduled demo
 * @param {array} favorites Favorited demos
 * @param {function} updateFavorites Function to update favorites array
 * @returns Display of demo information
 */
export function FavoriteDemo({ demo, favorites, updateFavorites }) {
    return (
        <li className="p-2.5 bg-demo m-2.5 rounded-md shadow-md grid grid-cols-10">
            <p className="text-lg col-start-1 col-end-11 text-palette">{demo.label}</p>
            <Star onClick={updateFavorites} favorites={favorites} demo={demo}/>
            <div className="col-start-1 col-end-11 p-2.5 text-palette-dark">
                <span className="px-2.5 inline-block">
                    <FontAwesomeIcon icon={faClock} />
                    <span className="px-1">{demo.time}</span>
                </span>
                <span className="px-2.5 inline-block">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span className="px-1">{spliceTags(demo.exhibit)}</span>
                </span>
            </div>
        </li>
    );
}