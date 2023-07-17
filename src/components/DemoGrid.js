import demoData from "../demoData.json";
import { Demo } from "./Demo";
import { Fragment } from "react";
import { ExhibitHeading } from "./ExhibitHeading";
import { DemoNoExhibit } from "./DemoNoExhibit";
import { transformTimeString } from "../utils";

export function DemoGrid({ filterExhibit, sort, updateFavorites, favorites }) {
    const copyDemos = [...demoData];

    function demoFilter(demo) {
        return (demo.Exhibit.toLowerCase() === filterExhibit.toLowerCase() || filterExhibit === "All Exhibits");
    }

    function exhibitSort(demoA, demoB) {
        const exhibitA = demoA.Exhibit;
        const exhibitB = demoB.Exhibit;

        return exhibitA.localeCompare(exhibitB);
    }

    function timeSort(demoA, demoB) {
        const timeA = transformTimeString(demoA.Time);
        const timeB = transformTimeString(demoB.Time);

        const dateA = new Date(`1970-01-01T${timeA}`);
        const dateB = new Date(`1970-01-01T${timeB}`);

        return dateA - dateB;
    };

    if (sort === 'Sort By Exhibit') {
        copyDemos.sort(exhibitSort);
        const filteredDemos = copyDemos.filter(demoFilter);
        let lastExhibit = "";
        return (
            <section className="demo-grid grid">
                {filteredDemos.length > 0 ? (
                    filteredDemos.map((demo, index) => {
                        if (lastExhibit !== demo.Exhibit) {
                            lastExhibit = demo.Exhibit;
                            return (
                                <Fragment key={demo.Exhibit}>
                                    <ExhibitHeading exhibit={demo.Exhibit} />
                                    <DemoNoExhibit demo={demo} updateFavorites={updateFavorites} favorites={favorites}/>
                                </Fragment>
                            );
                        } else {
                            return (
                                <DemoNoExhibit key={demo.Time + demo.Exhibit} demo={demo} updateFavorites={updateFavorites} favorites={favorites}/>
                            );
                        }
                    })
                ) : (
                    <p className="text-center pt-4">Sorry, no demos in this exhibit today.</p>
                )}
            </section>
        );
    } else {
        copyDemos.sort(timeSort);
        const filteredDemos = copyDemos.filter(demoFilter);
        return (
            <section className="demo-grid grid">
                {filteredDemos.length > 0 ? (
                    filteredDemos.map((demo) => (
                        <Demo key={demo.Time + demo.Exhibit} demo={demo} updateFavorites={updateFavorites} favorites={favorites}/>
                    ))
                ) : (
                    <p className="text-center pt-4">Sorry, no demos in this exhibit today.</p>
                )}
            </section>
        );
    }

}