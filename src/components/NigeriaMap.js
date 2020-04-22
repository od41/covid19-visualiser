import React, { useState, useEffect, memo } from 'react';
import * as d3 from 'd3';

import nigeria from '../nigeria.json';
import {feature} from 'topojson-client';
import * as d3proj from 'd3-geo-projection';

const NigeriaMap = ({cData, rData, dData, byStateData}) => {

    const globeRotation = [-9, -9, 0];
    const scale = 3250;
    const [geographies, setGeographies] = useState([])
    const [affectedStates, setAffectedStates] = useState([])


       //component neets to mount for Globe to render properly, handled by mounted state
    //Also toggles rotation based on default for easier testing

    const tooltip = d3.select("body").append("div") 
        .attr("class", "tooltip")       
        .style("opacity", 0);

    useEffect(() => {
        setGeographies(feature(nigeria, nigeria.objects.NGA_adm1).features);
        
        // check geographies for only affected states that are in the byStateData array
        setAffectedStates(checkForAffectedStates())

    }, [byStateData])


 
    const getPath = (datum) => {
        const projection = d3.geoOrthographic()
            .translate([1080/2, 720/2])
            .scale(scale)
            .rotate(globeRotation);

            let path = d3.geoPath()
                .projection(projection)

            return path(datum)
    }

    const checkForAffectedStates = () => {
        // compare geographies and byStateData, 
        // return array with states that have confirmed cases greater than 1
        let affectedStates = [];

        if(byStateData.states !== undefined ){
            affectedStates = geographies.map((data) => {
                if( byStateData.states[data.properties.NAME_1].confirmed > 0){
                    // only returns data with state confirmed cases greater than 0
                    return data;
                } else {return}
            })
        }

        return affectedStates;
    }

    const handleStateClick = (stateIndex) => {
        // console.log("state clicked!", stateIndex)
        // console.log("logging data", cData, rData, dData)
        
    }




    return (
        <div>

            {/* <svg width="1080" height="720" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid meet"> */}
            <svg width="1080" height="720">
            <g className="affected-states">
                    {
                        // I want to return only those states that have cases in the covid-cases object
                        affectedStates.map((d,i) => (
                            
                            <path 
                                key={`path-${i}`}
                                d={getPath(d)}
                                className="affected-state"
                                onClick={() => handleStateClick(i)} 
                                onMouseEnter={(evt) => {
                                    const {NAME_1} = d.properties;
                                    
                                    if(byStateData.states !== undefined ){
                                        if(byStateData.states[NAME_1].confirmed != 0) {
                                            tooltip.transition()    
                                                .duration(200)    
                                                .style("opacity", .9);    
                                            tooltip.html(`<h5 class="title">${NAME_1}</h5> 
                                                            Confirmed: ${byStateData.states[NAME_1].confirmed} </br>
                                                            Recovered: ${byStateData.states[NAME_1].recovered} </br>
                                                            Dead: ${byStateData.states[NAME_1].deaths}
                                                            `)  
                                                .style("left", (evt.pageX) + "px")   
                                                .style("top", (evt.pageY - 28) + "px");
                                        }
                                    }
                                    
                                  }}
                                  onMouseLeave={(evt) => {
                                      tooltip.html("")
                                    tooltip.transition()
                                        .duration(100)
                                        .style("opacity", 0);
                                  }}
                                style={{fill:"#D02943"}}
                            />
                        ))
                    }
                </g>

                <g className="map-outline">
                    {
                        geographies.map((d,i) => (
                            <path 
                                key={`path-${i}`}
                                d={getPath(d)}
                                className="state"
                                style={{fill:"none", stroke:'#E3F7FC', strokeWidth:'0.5px'}}
                            />
                        ))
                    }
                </g>
            </svg>
        </div>
    )

}

export default memo(NigeriaMap);