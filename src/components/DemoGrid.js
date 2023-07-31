import { Demo } from "./Demo";
import { Fragment, useState, useEffect } from "react";
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
    const [demoData, setDemoData] = useState([]);
    const [animalData, setAnimalData] = useState([]);

    useEffect(() => {
        fetch('https://dev-national-zoo.pantheonsite.io/api/demos/')
            .then(response => response.json())
            .then(data => {
                setDemoData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        fetch('https://dev-national-zoo.pantheonsite.io/api/animals')
            .then(response => response.json())
            .then(data => {
                setAnimalData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
    }, []);

    // Returns true if the demo's exhibit matches the filter, or if the filter is set to all exhibits
    function demoFilter(demo) {
        return (demo.exhibit.toLowerCase() === filter.toLowerCase() || filter === "All Exhibits");
    }

    /* Returns an integer indicating whether demoA's exhibit comes alphabetically before, 
    after, or is equivalent to demoB's exhibit. */
    function exhibitSort(demoA, demoB) {
        const exhibitA = demoA.exhibit;
        const exhibitB = demoB.exhibit;

        return exhibitA.localeCompare(exhibitB);
    }

    // Returns the difference between demoA's time and demoB's time. 
    function timeSort(demoA, demoB) {
        const timeA = transformTimeString(demoA.time);
        const timeB = transformTimeString(demoB.time);

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
                    currentExhibit = demo.exhibit;
                    return (
                        <Fragment key={demo.time + demo.exhibit}>
                            {/*Conditionally display an exhibit heading*/}
                            {(lastExhibit !== demo.exhibit && showHeadings) && <ExhibitHeading exhibit={demo.exhibit} />}
                            <Demo demo={demo} updateFavorites={updateFavorites} favorites={favorites} showExhibit={!showHeadings} animalData={animalData} />
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