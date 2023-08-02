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
        return (spliceTags(demo.exhibit.toLowerCase()) === filter.toLowerCase() || filter === "All Exhibits");
    }

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

    return (
        <section className="grid">
            {showHeadings && <div className="h-64 w-3/4 m-8 justify-self-center shadow-lg">
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
            </div>}
            {filteredDemos.length > 0 ? (
                // If any demos pass through the filter, render them
                filteredDemos.map(demo => {
                    lastExhibit = currentExhibit;
                    currentExhibit = demo.exhibit;
                    return (
                        <Fragment key={demo.time + demo.exhibit}>
                            {/*Conditionally display an exhibit heading*/}
                            {(lastExhibit !== demo.exhibit && showHeadings) && <ExhibitHeading exhibit={demo.exhibit} location={demo.location} />}
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