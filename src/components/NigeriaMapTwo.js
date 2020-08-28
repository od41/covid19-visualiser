import React, { useState, useEffect, memo, useRef } from 'react';
import * as d3 from 'd3';

import nigeria from '../nigeria.json';
import { feature } from 'topojson-client';
import useResizeObserver from './useResizeObserver'
import { schemeCategory10 } from 'd3';
// import * as d3proj from 'd3-geo-projection';
// import { scaleQuantize } from 'd3';

const NigeriaMapTwo = ({ byStateData }) => {

    const globeRotation = {
        small: [-8, -9, 0],
        mid: [-8, -13, 0],
        large: [-9, -13, 0]
    };
    // const scale = { small: 1300, mid: 2600, large: 3250 };
    const [geographies, setGeographies] = useState([]);
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedState, setSelectedState] = useState(null)



    useEffect(() => {
        setGeographies(feature(nigeria, nigeria.objects.NGA_adm1).features);

        const nigeriaMap = feature(nigeria, nigeria.objects.NGA_adm1);

        const svg = d3.select(svgRef.current)

        // const minProp = d3.min(geographies, feature => feature.properties["ID_0"]);
        // const maxProp = d3.max(geographies, feature => feature.properties["ID_0"]);

        let minProp, maxProp = 0;
        let colorScale;

        if (byStateData.data !== undefined) {
            minProp = d3.min(byStateData.data, cases => cases["confirmedCases"]);
            maxProp = d3.max(byStateData.data, cases => cases["confirmedCases"]);

            // colour function 1
            // colorScale = d3
            //     .scaleLinear()
            //     .domain([minProp, maxProp])
            //     .range(["red", "green"]);

            // colour function 2
            // colorScale = d3
            //     .scaleQuantize([1, 10], d3.schemeBlues[9])
            //     .domain([minProp, maxProp])
            //     .range(["#ffd5d5", "#ff8080", "#ff2a2a", "#d40000", "#800000"]);

            // colour function 2B
            colorScale = d3
                .scaleLinear([1, 3], ['#fed053', '#f5b301', '#3b3f46'])
            .domain([2, 5000])
            // .range(['#fee5d9', '#fcae91', '#fb6a4a', '#cb181d']);

            // colour function 3
            // colorScale = d3.scaleOrdinal(schemeCategory10);

            // colour function 4
            // colorScale = d3.scaleThreshold()
            //     .domain(d3.range(minProp, maxProp))
            //     .range(d3.schemeOranges[9]);

            // colour function 5
            // colorScale = d3.interpolateOranges(maxProp)
        }

        // use resized dimensions
        // fall back to getBoundingClientRect if no dimensions yet
        const { width, height } =
            dimensions || wrapperRef.current.getBoundingClientRect();

        // projects geo-coordinatees on a 2D plane
        // fit the whole map within svg container with feature() function
        const projection = d3.geoMercator().fitSize([width, height], selectedState || nigeriaMap).precision(100);

        // takes geojson data and transforms into the d attribute of a path element
        const pathGenerator = d3.geoPath().projection(projection);


        // render map
        svg.selectAll('.state')
            // show a dashed line and dot on click
            // .on("mouseover", centerBounds) //code doesn't work yet
            // .on("mouseout", clearCenterBounds)
            .data(geographies)
            .join("path")
            .on("click", feature => {
                // click once to zoom in
                // click a second time to zoom out
                if (selectedState === null) {
                    setSelectedState(feature)
                } else if (JSON.stringify(selectedState) === JSON.stringify(feature)) {
                    setSelectedState(null);
                }

            })
            .attr("class", "state")
            .transition()
            .attr("fill", "#000320")
            .attr("fill", (feature) => {
                const stateName = feature.properties.NAME_1.toLowerCase().substring(0, 3);

                if (byStateData.data !== undefined) {
                    // do something
                    let queryState = byStateData.data.find((el) => (el !== null) ? el.state.substring(0, 3) === stateName.toLowerCase().substring(0, 3) : el = 1);

                    if (queryState !== undefined) {
                        return colorScale(queryState.confirmedCases)
                        // console.log("qstate: ", queryState.confirmedCases)
                    }

                }

            })
            .attr("d", feature => pathGenerator(feature));

        // render text
        svg
            .selectAll(".label")
            .data([selectedState])
            .join("text")
            .attr("class", "label")
            .text(
                feature => {
                    if (feature !== null) {
                        const stateName = feature.properties.NAME_1.toLowerCase().substring(0, 3);

                        if (byStateData.data !== undefined) {
                            // do something
                            let queryState = byStateData.data.find((el) => (el !== null) ? el.state.substring(0, 3) === stateName.toLowerCase().substring(0, 3) : el = 1);

                            if (queryState !== undefined) {
                                // return feature.properties.NAME_1 + ": " + queryState.confirmedCases.toLocaleString();
                                console.log('queryState: ', queryState)
                                return `${feature.properties.NAME_1}\n
                                        Confirmed: ${queryState.confirmedCases.toLocaleString()} \n
                                        Recovered: ${queryState.discharged.toLocaleString()} \n \n
                                        Dead: ${queryState.death.toLocaleString()}
                                    `

                            } else {
                                // there's no reported case in this region
                                return `${feature.properties.NAME_1}\nNo reported cases.`;
                            }

                        }
                    }
                }
            )
            .raise()
            .attr("x", 50)
            .attr("y", 50)
            .attr("fill", "#fff");



    }, [byStateData, dimensions, selectedState])

    // center bounds on mouseover function
    const centerBounds = (d, i) => {
        let thisBounds = d3.geoPath.bounds(d);
        let thisCenter = d3.geoPath.centroid(d);
        d3.select("svg")
            .append("rect")
            .attr("class", "bbox")
            .attr("x", thisBounds[0][0])
            .attr("y", thisBounds[0][1])
            .attr("width", thisBounds[1][0] - thisBounds[0][0])
            .attr("height", thisBounds[1][1] - thisBounds[0][1])
            .style("fill", "none")
            .style("stroke-dasharray", "5 5")
            .style("stroke", "black")
            .style("stroke-width", 2)
            .style("pointer-events", "none");

        d3.select("svg")
            .append("svg")
            .append("circle")
            .attr("class", "centroid")
            .style("fill", "red")
            .attr("r", 5)
            .attr("cx", thisCenter[0]).attr("cy", thisCenter[1])
            .style("pointer-events", "none");
    }

    const clearCenterBounds = () => {
        d3.selectAll("circle.centroid").remove();
        d3.selectAll("rect.bbox").remove();
    }

    return (
        <div ref={wrapperRef}>

            <svg ref={svgRef}></svg>
        </div>
    )

}

export default memo(NigeriaMapTwo);