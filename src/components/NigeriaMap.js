import React, { useState, useEffect, memo } from 'react';
import * as d3 from 'd3';

import nigeria from '../nigeria.json';
import {feature} from 'topojson-client';
import * as d3proj from 'd3-geo-projection';
import { scaleQuantize } from 'd3';

const NigeriaMap = ({cData, rData, dData, byStateData, dimensions}) => {

    const globeRotation = {
        small: [-8, -9, 0],
        mid: [-8, -13, 0],
        large: [-9, -13, 0]};
    const scale = {small: 1300, mid: 2600, large: 3250};
    const [geographies, setGeographies] = useState([])
    const [affectedStates, setAffectedStates] = useState([])
    const [screenSize, setScreenSize] = useState('')


       //component neets to mount for Globe to render properly, handled by mounted state
    //Also toggles rotation based on default for easier testing

    const tooltip = d3.select("body").append("div") 
        .attr("class", "tooltip")       
        .style("opacity", 0);

    useEffect(() => {
        setGeographies(feature(nigeria, nigeria.objects.NGA_adm1).features);
        
        // check geographies for only affected states that are in the byStateData array
        setAffectedStates(checkForAffectedStates());

        console.log(dimensions)

    }, [byStateData])


    useEffect(() => {
        // hook monitors the canvas element and updates on changes
        
    
        setScreenSize(responsiveNormaliser());
      }, [dimensions]);

    const responsiveNormaliser = () => {
        let size = '';
        // breakpoint for small screen
        if (dimensions.width < 361) {
            size = 'small'
        } else if ( dimensions.width < 768) {
            size = 'mid'
        } else {
            size = 'large'
        }
        console.log(size)
        return size; 
        // returns a string with the size of the screen at that time
    }


 
    const getPath = (datum) => {
        const projection = d3.geoOrthographic()
            .translate([dimensions.width/2, dimensions.height/2])
            .scale(scale[screenSize])
            .rotate(globeRotation[screenSize]);

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
        <>

            {/* <svg width="1080" height="720" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid meet"> */}
            <svg >
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
        </>
    )

}

export default memo(NigeriaMap);