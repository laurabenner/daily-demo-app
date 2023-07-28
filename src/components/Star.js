import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import { faStar as regularFaStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidFaStar } from "@fortawesome/free-solid-svg-icons";

/**
 * @param {function} onClick Function to be executed on click
 * @param {object} demo Contains demo information
 * @param {array} favorites Favorited demos
 * @returns Star button
 */
export function Star({ onClick, demo, favorites }) {
    // Holds state of star; initially true if demo is in favorites
    const [favorited, setFavorited] = useState(() => {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].Demo === demo.Demo && favorites[i].Time === demo.Time && favorites[i].Exhibit === demo.Exhibit) {
                return true;
            }
        } 
        return false;
    })

    // If favorites or demo changes, update favorited
    useEffect(() => {
        setFavorited(() => {
            for (let i = 0; i < favorites.length; i++) {
                if (favorites[i].Demo === demo.Demo && favorites[i].Time === demo.Time && favorites[i].Exhibit === demo.Exhibit) {
                    return true;
                }
            } 
            return false;
        });
        console.log('wow');
    }, [favorites, demo]);

    // Call onClick function and adjust state when star icon is clicked
    const handleClick = () => {
        onClick(demo);
        setFavorited(!favorited);
    };

    return (
        <div className="col-start-12 col-span-1 row-span-1 text-right px-2.5 text-palette-dark">
            <button onClick={handleClick}>
                {/*Display a solid star if favorited*/}
                {favorited ? <FontAwesomeIcon icon={solidFaStar} /> : <FontAwesomeIcon icon={regularFaStar} />}
            </button>
        </div>
    );
}