import { Demo } from "./Demo";
import { Fragment, useState, useEffect } from "react";
import { ExhibitHeading } from "./ExhibitHeading";
import { timeSort } from "../utils";
import { exhibitSort } from "../utils";
import { getMarker } from "../utils";
import { spliceTags } from "../utils";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

/**
 * @param {string} filter Selected exhibit filter
 * @param {string} sort Selected sort type
 * @param {function} updateFavorites Function to update favorites array
 * @param {array} favorites Favorited demos
 * @returns Grid of Demo and ExhibitHeading components
 */
export function DemoGrid({ filter, sort, favorites, updateFavorites }) {
    // Holds demo data in state
    const [demoData, setDemoData] = useState([]);

    // Holds animal data in state
    const [animalData, setAnimalData] = useState([]);

    // True if data is loading
    const [isLoading, setIsLoading] = useState(true);

    // Fetches demo and animal data and sets state
    useEffect(() => {
        Promise.all([
            fetch('https://dev-national-zoo.pantheonsite.io/api/demos/').then(response => response.json()),
            fetch('https://dev-national-zoo.pantheonsite.io/api/animals').then(response => response.json())
        ])
            .then(([demoData, animalData]) => {
                setDemoData(demoData);
                setAnimalData(animalData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Returns true if the demo's exhibit matches the filter, or if the filter is set to all exhibits
    function demoFilter(demo) {
        return (spliceTags(demo.exhibit.toLowerCase()) === filter.toLowerCase() || filter === "All Exhibits");
    }

    // Sort and filter demos
    let filteredDemos = [];
    let showHeadings;
    let showMap;
    if (sort === 'Sort By Time') {
        filteredDemos = demoData.sort(timeSort).filter(demoFilter);
        showHeadings = false;
        showMap = false;
    } else if (sort === 'Sort By Exhibit') {
        filteredDemos = demoData.sort(exhibitSort).filter(demoFilter);
        showHeadings = true;
        showMap = false;
    } else {
        filteredDemos = demoData.sort(exhibitSort).filter(demoFilter);
        showHeadings = true;
        showMap = true;
    }

    // Get markers
    let markers = [];
    for (const demo of filteredDemos) {
        let duplicate = false;
        for (let i = 0; i < markers.length; i++) {
            if (markers[i].point[0] === getMarker(demo.location, spliceTags(demo.exhibit)).point[0] && markers[i].point[1] === getMarker(demo.location, spliceTags(demo.exhibit)).point[1]) {
                duplicate = true;
            }
        }
        if (!duplicate) {
            markers.push(getMarker(demo.location, spliceTags(demo.exhibit)));
        }
    }

    let lastExhibit;

    return (
        !isLoading &&
        <section className={"grid " + (showMap ? "grid-cols-2 flex-grow overflow-y-scroll" : "")}>
            {
                <div className={"justify-self-center " + (showMap ? "col-start-1 w-full overflow-y-scroll scroll-smooth " : "w-11/12 lg:w-4/6")}>
                    {filteredDemos.length > 0 ? (
                        // If any demos pass through the filter, render them
                        filteredDemos.map(demo => {
                            let newSection = lastExhibit !== demo.exhibit;
                            lastExhibit = demo.exhibit;
                            return (
                                <Fragment key={demo.time + demo.exhibit}>
                                    {/*Conditionally display an exhibit heading*/}
                                    {(newSection && showHeadings) && <ExhibitHeading exhibit={demo.exhibit} location={demo.location} showMap={showMap}/>}
                                    <Demo demo={demo} favorites={favorites} updateFavorites={updateFavorites} sort={sort} showExhibit={!showHeadings} showMap={showMap} animalData={animalData} />
                                </Fragment>
                            );
                        })
                    ) : (
                        // If no demos pass through the filter, render a message
                        <p className="text-center pt-4">Sorry, no demos in this exhibit today.</p>
                    )}
                </div>
            }
            {
                showMap &&
                <div className="col-start-2 w-full">
                    <MapContainer style={{ width: "100%", height: "100%" }} center={[38.93, -77.05]} zoom={16} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {markers.map(marker => {
                            return (
                                <Marker key={marker.point} position={marker.point}>
                                    <Popup>
                                        {marker.exhibit}
                                        <br></br>
                                        <a href={'#' + marker.exhibit}>See demos</a>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </div>
            }
        </section>
    );
}