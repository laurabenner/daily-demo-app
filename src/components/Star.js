import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export function Star() {
    return (
        <div className="col-start-12 col-span-1 row-span-1 text-right px-2.5">
            <FontAwesomeIcon icon={faStar} />
        </div>
    );
}