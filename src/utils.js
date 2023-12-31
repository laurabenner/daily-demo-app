/**
 * Transforms a string from 12-hour to 24-hour format
 * @param {String} timeString Time in 12-hour format
 * @returns Transformed string
 */
export function transformTimeString(timeString) {
    return timeString.replace(
        /(\d+):(\d+) (AM|PM)/i,
        (_, h, m, p) => `${String(p.toLowerCase() === "pm" ? +h + 12 : h).padStart(2, "0")}:${m}`
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

// Returns the difference between demoA's time and demoB's time. 
export function timeSort(demoA, demoB) {
    const timeA = transformTimeString(demoA.time);
    const timeB = transformTimeString(demoB.time);

    const dateA = new Date(`1970-01-01T${timeA}`);
    const dateB = new Date(`1970-01-01T${timeB}`);

    return dateA - dateB;
}

/* Returns an integer indicating whether demoA's exhibit comes alphabetically before, 
    after, or is equivalent to demoB's exhibit. */
export function exhibitSort(demoA, demoB) {
    const exhibitA = demoA.exhibit;
    const exhibitB = demoB.exhibit;

    return exhibitA.localeCompare(exhibitB);
}

/**
 * Replaces HTML tags and entities with their plaintext equivalents
 * @param {String} string Input string containing HTML tags and entities
 * @returns Plain text without HTML tags and entities
 */
export function spliceTags(string) {
    let plaintext = string.replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&#039;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&rsquo;/g, "’")
        .replace(/<[^>]+>/g, "");
    return plaintext;
}

/**
 * Cuts the input string into two sentences
 * @param {String} string Input string containing multiple sentences
 * @returns The first two sentences of the input string
 */
export function cutSentences(string) {
    var pattern = /[^.!?]+[.!?]+/g;
    var sentences = string.match(pattern);
    var result = sentences.slice(0, 2).join(' ');
    return result;
}

/**
 * Extracts a Google Maps link from a string containing geo-coordinates in a specific format
 * @param {String} inputString Input string containing geo-coordinates in the format "POINT (longitude latitude)"
 * @returns Google Maps link for the given geo-coordinates
 *          If inputString is not a valid string, returns a default Google Maps link
 */
export function getPointLink(inputString) {
    if (typeof inputString !== 'string') {
        return "https://www.google.com/maps";
    }

    const regex = /POINT \(([-+]?\d+\.\d+) ([-+]?\d+\.\d+)\)/;
    const match = inputString.match(regex);

    const longitude = parseFloat(match[1]);
    const latitude = parseFloat(match[2]);

    const googleMapsLink = `https://www.google.com/maps/dir//${latitude}+${longitude}/@${latitude},${longitude},18z/data=!4m6!4m5!1m0!1m3!2m2!1d${longitude}!2d${latitude}?entry=ttu`;

    return googleMapsLink;
}

export function getMarker(location, exhibit) {
    const marker = {};

    const regex = /POINT \(([-+]?\d+\.\d+) ([-+]?\d+\.\d+)\)/;
    const match = location.match(regex);
    let point = [];
    const longitude = parseFloat(match[1]);
    const latitude = parseFloat(match[2]);
    point.push(latitude);
    point.push(longitude);

    marker.point = point;
    marker.exhibit = exhibit;

    return marker;
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

export function findAnimals(label, exhibit, animalData) {
    let animals = [];
    for (const animal of animalData) {
        if (label.toLowerCase().includes(animal.label.toLowerCase())
            && exhibit.toLowerCase() === animal.exhibit_label.toLowerCase()) {
            animals.push(animal);
        }
    }
    for (let i = 1; i < animals.length; i++) {
        if (animals[i - 1].label === animals[i].label) {
            animals.splice(i, 1);
        }
    }
    return animals;
}
