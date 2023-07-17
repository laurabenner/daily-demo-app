import { transformExhibitString } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { spliceTags } from "../utils";
import { cutSentences } from "../utils";

export function AnimalDropdown({ animal, updateAnimal }) {
    const darkColorClass = "bg-" + transformExhibitString(animal.exhibit_label) + "-dark";
    const lightColorClass = "text-" + transformExhibitString(animal.exhibit_label) + "-light";
    const defaultColorClass = "border-" + transformExhibitString(animal.exhibit_label);
    const defaultColorTextClass = "text-" + transformExhibitString(animal.exhibit_label);

    function handleClick() {
        updateAnimal("");
    }

    return (
        <div className={"justify-self-end w-9/12 sm:w-10/12 grid grid-cols-9 sm:grid-cols-10 p-4 border rounded-b-big border-transparent text-white " + darkColorClass}>
            <img className={"w-24 h-24 mr-2.5 col-start-1 col-span-3 sm:col-span-2 row-span-3 justify-self-center border-4 rounded-full object-cover " + defaultColorClass} src={animal.thumbnail} alt={animal.label}></img>
            <p className="col-start-4 px-1 sm:col-start-3 col-end-10 text-lg">{animal.label}</p>
            <button onClick={handleClick} className="col-start-10 text-right px-2.5">
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <span className={"col-start-4 sm:col-start-3 col-end-10 " + defaultColorTextClass}>
                <FontAwesomeIcon icon={faCircleExclamation} />
                {" Conservation Status: " + animal.iucn}
            </span>
            <p className={"text-demo px-1 col-start-4 sm:col-start-3 col-end-10 " + lightColorClass}>
                {cutSentences(spliceTags(animal.description))}
                <span className="inline-block">
                    <a
                        className="underline px-1"
                        href={animal.path}
                        target="_blank"
                        rel="noreferrer">
                        Read more
                    </a>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </span>
            </p>
        </div>
    );
}