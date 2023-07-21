import demoData from "../demoData.json";
import { Demo } from "./Demo";
import { Fragment } from "react";
import { ExhibitHeading } from "./ExhibitHeading";
import { transformTimeString } from "../utils";

/**
 * @param {string} filter Selected exhibit filter
 * @param {string} sort Selected sort type
 * @param {function} updateFavorites Function to update favorites array
 * @param {array} favorites Favorited demos
 * @returns Grid of Demo and ExhibitHeading components
 */
export function DemoGrid({ filter, sort, updateFavorites, favorites }) {

    // Returns true if the demo's exhibit matches the filter, or if the filter is set to all exhibits
    function demoFilter(demo) {
        return (demo.Exhibit.toLowerCase() === filter.toLowerCase() || filter === "All Exhibits");
    }

    /* Returns an integer indicating whether demoA's exhibit comes alphabetically before, 
    after, or is equivalent to demoB's exhibit. */
    function exhibitSort(demoA, demoB) {
        const exhibitA = demoA.Exhibit;
        const exhibitB = demoB.Exhibit;

        return exhibitA.localeCompare(exhibitB);
    }

    // Returns the difference between demoA's time and demoB's time. 
    function timeSort(demoA, demoB) {
        const timeA = transformTimeString(demoA.Time);
        const timeB = transformTimeString(demoB.Time);

        const dateA = new Date(`1970-01-01T${timeA}`);
        const dateB = new Date(`1970-01-01T${timeB}`);

        return dateA - dateB;
    };

    let lastExhibit;
    let currentExhibit = '';
    let filteredDemos = [];
    let showHeadings;

    // Sort and filter demos
    if (sort === 'Sort By Exhibit') {
        filteredDemos = demoData.sort(exhibitSort).filter(demoFilter);
        showHeadings = true;
    } else {
        filteredDemos = demoData.sort(timeSort).filter(demoFilter);
        showHeadings = false;
    }

    return (
        <section className="grid">
            {filteredDemos.length > 0 ? (
                // If any demos pass through the filter, render them
                filteredDemos.map(demo => {
                    lastExhibit = currentExhibit;
                    currentExhibit = demo.Exhibit;
                    return (
                        <Fragment key={demo.Time + demo.Exhibit}>
                            {/*Conditionally display an exhibit heading*/}
                            {(lastExhibit !== demo.Exhibit && showHeadings) && <ExhibitHeading exhibit={demo.Exhibit} />}
                            <Demo demo={demo} updateFavorites={updateFavorites} favorites={favorites} showExhibit={!showHeadings} />
                        </Fragment>
                    );
                })
            ) : (
                // If no demos pass through the filter, render a message
                <p className="text-center pt-4">Sorry, no demos in this exhibit today.</p>
            )}
        </section>
    );
}