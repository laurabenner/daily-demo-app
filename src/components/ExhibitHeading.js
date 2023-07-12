import { transformExhibitString } from "../utils";

export function ExhibitHeading({ exhibit }) {
    const exhibitColorClass = "text-" + transformExhibitString(exhibit);

    return (
        <div className={"mt-4 ml-6 w-11/12 lg:w-4/6 justify-self-center text-2xl font-bold " + exhibitColorClass}>
            <h2>
                <a
                    className={"hover:underline"}
                    href={"https://nationalzoo.si.edu/animals/exhibits/"
                        + transformExhibitString(exhibit).replace("africa-trail", "cheetah-conservation-station")}
                    target="_blank"
                    rel="noreferrer">
                    {exhibit}
                </a>
            </h2>
        </div>
    );
}