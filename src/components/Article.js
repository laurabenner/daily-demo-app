import { useState } from "react";

import { TimeInput } from "../components/TimeInput";
import { DemoGrid } from "../components/DemoGrid";
import { Select } from "../components/Select";
import { Button } from "./Button";

export function Article() {
    const [filterExhibit, setFilterExhibit] = useState("all");
    const [filterArrivalTime, setFilterArrivalTime] = useState("08:00");
    const [filterDepartureTime, setFilterDepartureTime] = useState("18:00");
    const [sort, setSort] = useState("time");
    const [toggleTime, setToggleTime] = useState("toggled");
    const [toggleExhibit, setToggleExhibit] = useState("untoggled");

    const updateFilterExhibit = (newValue) => {
        setFilterExhibit(newValue);
    };

    const updateArrivalTime = (newValue) => {
        setFilterArrivalTime(newValue);
    };

    const updateDepartureTime = (newValue) => {
        setFilterDepartureTime(newValue);
    };

    const updateSortTime = () => {
        setSort("time");
        setToggleTime("toggled");
        setToggleExhibit("untoggled");
    };

    const updateSortExhibit = () => {
        setSort("exhibit");
        setToggleTime("untoggled");
        setToggleExhibit("toggled");
    }

    return (
        <article>
            <div className="filters text-center">
                <Select updateFilterExhibit={updateFilterExhibit} />

                <Button onClick={updateSortTime} toggled={toggleTime} text="Sort By Time" />
                <Button onClick={updateSortExhibit} toggled={toggleExhibit} text="Sort By Exhibit"></Button>

                <TimeInput label="Arrival" defaultValue="08:00" onChange={updateArrivalTime} />
                <TimeInput label="Departure" defaultValue="18:00" onChange={updateDepartureTime} />
            </div>

            <DemoGrid
                filterExhibit={filterExhibit}
                filterArrivalTime={filterArrivalTime}
                filterDepartureTime={filterDepartureTime}
                sort={sort}
            />
        </article>
    );
}