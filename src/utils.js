import animals from "./animals.json";

/**
 * Transforms a string from 12-hour to 24-hour format
 * @param {String} timeString Time in 12-hour format
 * @returns Transformed string
 */
export function transformTimeString(timeString) {
    return timeString.replace(
        /(\d+):(\d+) (AM|PM)/,
        (_, h, m, p) => `${String(p === "PM" ? +h + 12 : h).padStart(2, "0")}:${m}`
    );
}

/**
 * Transforms string to remove special characters, lowercase, and hyphenate
 * @param {String} exhibitString Exhibit string from JSON file
 * @returns Transformed string
 */
export function transformExhibitString(exhibitString) {
    return exhibitString
        .toLowerCase()
        .replaceAll(" (outdoor viewing)", "")
        .replaceAll(" &amp; ", "-")
        .replaceAll("&#039;", "")
        .replaceAll(" & ", "-")
        .replaceAll(" ", "-")
        .replaceAll("'", "");
}

/**
 * Transforms string to uppercase
 * @param {String} animalString Animal string from JSON file
 * @returns Transformed string
 */
export function transformAnimalString(animalString) {
    return animalString
        .toUpperCase()
        .replaceAll("&amp;", "&")
        .replaceAll("&#039;", "'");
}

/**
 * Transforms string into the url for the animal's page on the National Zoo website
 * @param {String} animal 
 * @returns URL
 */
export function getAnimalUrl(animal) {
    let url = "https://nationalzoo.si.edu/animals/" + animal.toLowerCase()
        .replaceAll("'", "")
        .replaceAll(" ", "-")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("chicken", "domestic-chicken")
        .replaceAll("day-gecko", "day-gecko-0");
    return url;
}

export function findAnimal(animal) {
    return animals.find(thisAnimal => thisAnimal.label === animal);
}
