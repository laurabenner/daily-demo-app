import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FavoriteDemo } from "./FavoriteDemo";

export function Popper({ popped, updatePopped, favorites, updateFavorites }) {
    function handleClick() {
        updatePopped(false);
    }

    return (
        <div className={(popped ? "block " : "hidden ") + "font-poppins w-1/2 max-h-96 overflow-y-scroll bg-white rounded-lg shadow-lg p-6 absolute left-1/4 top-48 mx-auto"}>
            <div className="grid grid-cols-10">
            <h1 className="text-3xl text-asia-trail font-bold">Favorites</h1>
            <button onClick={handleClick} className="col-start-10 text-right px-2.5">
                <FontAwesomeIcon icon={faXmark} />
            </button>
            </div>
            <ul>
                {
                    favorites.map(favorite => {
                        return (
                            <FavoriteDemo key={favorite.Time + favorite.Demo} demo={favorite} favorites={favorites} updateFavorites={updateFavorites} />
                        );
                    })
                }
            </ul>
        </div>
    );
}