import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faStar as regularFaStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidFaStar } from "@fortawesome/free-solid-svg-icons";

export function Star({ onClick, demo, favorites }) {
    const [favorited, setFavorited] = useState(favorites.includes(demo) ? true : false)

    const handleClick = () => {
        onClick(demo);
        setFavorited(!favorited);
    };

    return (
        <div className="col-start-12 col-span-1 row-span-1 text-right px-2.5">
            <button onClick={handleClick}>
                {favorited ? <FontAwesomeIcon icon={solidFaStar} /> : <FontAwesomeIcon icon={regularFaStar} />}
            </button>
        </div>
    );
}