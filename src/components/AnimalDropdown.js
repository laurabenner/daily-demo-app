import { transformExhibitString } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export function AnimalDropdown({ animal }) {
    const darkColorClass = "bg-" + transformExhibitString(animal.exhibit_label) + "-dark";
    const lightColorClass = "text-" + transformExhibitString(animal.exhibit_label) + "-light";
    const defaultColorClass = "bg-" + transformExhibitString(animal.exhibit_label);

    return (
        <div className={"justify-self-end w-9/12 sm:w-10/12 p-4 border rounded-b-xl border-transparent text-white " + darkColorClass}>
            <div className={"w-24 h-24 mr-2.5 float-left rounded-full " + defaultColorClass}></div>
            <p className="text-lg inline">{animal.label}</p>
            <div className="float-right inline">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                <a
                    className="hover:underline p-2.5"
                    href={animal.path}
                    target="_blank"
                    rel="noreferrer">
                    Learn more
                </a>
            </div>
            <p className={"text-demo " + lightColorClass}>{animal.description}</p>
        </div>
    );
}