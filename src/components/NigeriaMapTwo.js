import React, { useState, useEffect, memo, useRef } from 'react';
import * as d3 from 'd3';

import nigeria from '../nigeria.json';
import {feature} from 'topojson-client';
import useResizeObserver from './useResizeObserver'
// import * as d3proj from 'd3-geo-projection';
// import { scaleQuantize } from 'd3';

const NigeriaMapTwo = ({byStateData}) => {

    const globeRotation = {
        small: [-8, -9, 0],
        mid: [-8, -13, 0],
        large: [-9, -13, 0]};
    const scale = {small: 1300, mid: 2600, large: 3250};
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

        if (byStateData.data !== undefined){
                minProp = d3.min(byStateData.data, cases => cases["confirmedCases"]);
                maxProp = d3.max(byStateData.data, cases => cases["confirmedCases"]);
                colorScale = d3
                                .scaleLinear()
                                .domain([minProp, maxProp])
                                .range(["#071d32", "#58c7df"])
            }
        
        // use resized dimensions
        // fall back to getBoundingClientRect if no dimensions yet
        const {width, height} = 
            dimensions || wrapperRef.current.getBoundingClientRect();

        // projects geo-coordinatees on a 2D plane
        // fit the whole map within svg container with feature() function
        const projection = d3.geoMercator().fitSize([width, height], selectedState || nigeriaMap).precision(100);

        // takes geojson data and transforms into the d attribute of a path element
        const pathGenerator = d3.geoPath().projection(projection);


        // render map
        svg.selectAll('.state')
            .data(geographies)
            .join("path")
            .on("click", feature => {
                // click once to zoom in
                // click a second time to zoom out
                if(selectedState === null) {
                    setSelectedState(feature)
                } else if (JSON.stringify(selectedState) === JSON.stringify(feature)) {
                    setSelectedState( null );
                }
                
            })
            .attr("class", "state")
            .transition()
            .attr("fill", "#000320")
            .attr("fill", (feature) => {
                const stateName = feature.properties.NAME_1.toLowerCase().substring(0,3);
                
                if (byStateData.data !== undefined) {
                    // do something
                    let queryState = byStateData.data.find((el) => (el !== null) ? el.state.substring(0,3) === stateName.toLowerCase().substring(0,3) : el = 1 );
                    
                    if(queryState !== undefined) {
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
                    console.log(feature)
                    const stateName = feature.properties.NAME_1.toLowerCase().substring(0,3);

                    if (byStateData.data !== undefined) {
                        // do something
                        let queryState = byStateData.data.find((el) => (el !== null) ? el.state.substring(0,3) === stateName.toLowerCase().substring(0,3) : el = 1 );
                        
                        if(queryState !== undefined) {
                            return feature.properties.NAME_1 + ": " + queryState.confirmedCases.toLocaleString();
                        }
    
                    }
                }
            }
        )
        .attr("x", 50)
        .attr("y", 50)
        .attr("fill", "#fff");

            
    }, [byStateData, dimensions, selectedState])

    return (
        <div ref={wrapperRef}>

            <svg ref={svgRef}></svg>
        </div>
    )

}

export default memo(NigeriaMapTwo);