export function AnimalImage({ animal }) {
    let url = animal.path.replaceAll("\\", "");

    return (
        <img src={animal.path} alt={animal.label} onClick={url}></img>
    );
}