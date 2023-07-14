import { transformExhibitString } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { spliceTags } from "../utils";
import { cutSentences } from "../utils";

export function AnimalDropdown({ animal, updateAnimal }) {
    const darkColorClass = "bg-" + transformExhibitString(animal.exhibit_label) + "-dark";
    const lightColorClass = "text-" + transformExhibitString(animal.exhibit_label) + "-light";
    const defaultColorClass = "bg-" + transformExhibitString(animal.exhibit_label);

    function handleClick() {
        updateAnimal("");
    }

    return (
        <div className={"justify-self-end w-9/12 sm:w-10/12 p-4 border rounded-b-big border-transparent text-white bg-gradient-to-t " + darkColorClass}>
            <div className={"w-24 h-24 mr-2.5 float-left rounded-full " + defaultColorClass}></div>
            <p className="text-lg inline">{animal.label}</p>
            <button onClick={handleClick} className="float-right inline">
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <br></br>
            <p className={"text-demo inline " + lightColorClass}>{cutSentences(spliceTags(animal.description))}</p>
            <div className="inline">
                <a
                    className="underline p-2.5"
                    href={animal.path}
                    target="_blank"
                    rel="noreferrer">
                    Read more
                </a>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </div>
        </div>
    );
}