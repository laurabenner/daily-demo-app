import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { spliceTags } from "../utils";
import { cutSentences } from "../utils";

export function AnimalDropdown({ animal, updateAnimal }) {
    function handleClick() {
        updateAnimal("");
    }

    return (
        <div className={"justify-self-end hidden md:grid w-10/12 grid-cols-10 p-4 border rounded-b-big shadow-md text-white bg-palette-dark"}>
            <img className={"w-24 h-24 mr-2.5 col-start-1 col-span-2 row-span-3 justify-self-center border-4 rounded-full object-cover border-palette-light"} src={animal.thumbnail} alt={animal.label}></img>
            <p className="px-1 col-start-3 col-end-10 text-lg">{animal.label}</p>
            <button onClick={handleClick} className="col-start-10 text-right px-2.5">
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <span className={"col-start-3 col-end-11 text-palette-light"}>
                <FontAwesomeIcon icon={faCircleExclamation} />
                {" Conservation Status: " + animal.iucn}
            </span>
            <p className={"text-white px-1 col-start-3 col-end-11"}>
                {cutSentences(spliceTags(animal.description))}
                <span className="inline-block text-palette-light">
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