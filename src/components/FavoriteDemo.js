export function FavoriteDemo({ demo, favorites, updateFavorites }) {
    return(
        <li>{demo.Time + " " + demo.Demo + " in " + demo.Exhibit}</li>
    );
}