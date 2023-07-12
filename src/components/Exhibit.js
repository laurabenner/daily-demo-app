import { transformExhibitString } from "../utils";

export function Exhibit({ exhibit }) {
    const exhibitColorClass = "text-" + transformExhibitString(exhibit);

    return (
        <div className="exhibit col-start-4 sm:col-start-3 col-end-11 row-span-2">
            <p>
                <a
                    className={exhibitColorClass + " hover:underline"}
                    href={"https://nationalzoo.si.edu/animals/exhibits/"
                        + transformExhibitString(exhibit).replace("africa-trail", "cheetah-conservation-station")}
                    target="_blank"
                    rel="noreferrer">
                    {exhibit.toUpperCase()}
                </a>
            </p>
        </div>
    );
}