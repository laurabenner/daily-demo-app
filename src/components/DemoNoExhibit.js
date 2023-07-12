import { transformExhibitString } from "../utils";
import { Time } from "./Time";
import { Description } from "./Description";

export function DemoNoExhibit({ demo }) {

    return (
        <div
            className="demo-no-exhibit bg-demo p-4 m-2 border rounded-xl border-transparent w-11/12 lg:w-4/6 justify-self-center grid grid-cols-12"
            data-exhibit={transformExhibitString(demo.Exhibit)}
        >
            <Time time={demo.Time} />
            <Description description={demo.Demo} />
        </div>
    );
}