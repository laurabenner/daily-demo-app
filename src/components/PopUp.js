import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FavoriteDemo } from "./FavoriteDemo";

/**
 * @param {boolean} popped True if pop-up should be displayed
 * @param {function} updatePopped Function to update popped
 * @param {array} favorites Favorited demos
 * @param {function} updateFavorites Function to update favorites
 * @returns Pop up display of favorited demos
 */
export function PopUp({ popped, updatePopped, favorites, updateFavorites }) {

    // When 'X' is clicked, update popped to false
    function handleClick() {
        updatePopped(false);
    }

    // When 'Clear All' is clicked, update favorites to "clear"
    function clearAll() {
        updateFavorites("clear");
    }

    return (
        <div className={(popped ? "block " : "hidden ") + "font-poppins z-50 lg:w-1/2 max-h-96 overflow-y-scroll bg-white rounded-lg shadow-lg p-6 m-6 lg:m-0 absolute lg:left-1/4 top-24 md:top-48"}>
            <div className="grid grid-cols-10">
                <h1 className="text-3xl text-palette font-bold">Favorites</h1>
                <button onClick={handleClick} className="col-start-10 text-right px-2.5">
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <ul>
                {favorites.length > 0 ? (
                    // If there are demos in favorites, render them
                    favorites.map(favorite => {
                        return (
                            <FavoriteDemo key={favorite.Time + favorite.Demo} demo={favorite} favorites={favorites} updateFavorites={updateFavorites} popped={popped} />
                        );
                    })
                ) : (
                    // If there are no demos in favorites, render a message
                    <p className="text-center p-2.5">No favorites selected. </p>
                )
                }
            </ul>
            <button onClick={clearAll} className="text-palette underline float-right">Clear All</button>
        </div>
    );
}