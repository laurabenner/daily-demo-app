import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Star } from "./Star";

export function FavoriteDemo({ demo, favorites, updateFavorites }) {
    return(
        <li className="p-2.5 bg-demo m-2.5 rounded-md grid grid-cols-10">
            <p className="text-lg col-start-1 col-end-11">{demo.Demo}</p>
            <Star onClick={updateFavorites} favorites={favorites} demo={demo}/>
            <span className="p-2.5 col-start-1 col-end-3">
                <FontAwesomeIcon icon={faClock} />
                <span className="px-1">{demo.Time}</span>
            </span>
            <span className="p-2.5 col-start-3 col-end-11">
                <FontAwesomeIcon icon={faLocationDot} />
                <span className="px-1">{demo.Exhibit}</span>
            </span>
        </li>
    );
}