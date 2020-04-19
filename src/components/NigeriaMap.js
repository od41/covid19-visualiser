import React, { useState, useEffect, useRef, memo } from 'react';
import * as d3 from 'd3';

import nigeria from '../nigeria.json';
import {feature} from 'topojson-client';
import * as d3proj from 'd3-geo-projection';

const NigeriaMap = (props) => {

    const globeRotation = [-9, -9, 0];
    const scale = 3250;
    const [geographies, setGeographies] = useState([])
    const canvas = useRef();

    const tooltip = d3.select("body").append("div") 
        .attr("class", "tooltip")       
        .style("opacity", 0);

    useEffect(() => {
        setGeographies(feature(nigeria, nigeria.objects.NGA_adm1).features);
        console.log(geographies)

    }, [])


 

    // const [mounted, setMounted] = useState(false); 
    const projection = d3.geoOrthographic()
                        .translate([1080/2, 600/2])
                        .scale(scale)
                        .rotate(globeRotation)

    const handleStateClick = (stateIndex) => {
        console.log("state clicked!", stateIndex)
    }



    return (
        <div ref={canvas}>

            <svg width={ 1080 } height={ 600 } >
                <g>
                    {
                        geographies.map((d,i) => (
                            <path 
                                key={`path-${i}`}
                                d={d3.geoPath().projection(projection)(d)}
                                className="state"
                                onClick={() => handleStateClick(i)} 
                                onMouseEnter={(evt) => {
                                    const {NAME_1} = d.properties;
                                    console.log(evt.pageX, evt.pageY)

                                    // let pageX=d3.event.pageX;
                                    // let pageY=d3.event.pageY;
            
                                    
                                    if(props.byStateData.states !== undefined ){
                                        tooltip.transition()    
                                            .duration(200)    
                                            .style("opacity", .9);    
                                        tooltip.html(NAME_1)  
                                            .style("left", (evt.pageX) + "px")   
                                            .style("top", (evt.pageY - 28) + "px");
                                        
                                    }

                                    
                                    
                                  }}
                                  onMouseLeave={() => {
                                    tooltip.transition()
                                        .duration(500)
                                        .style("opacity", 0);

                                  }}
                                  style={{fill:"#b0b0b0", stroke:'#808080', strokeWidth:'0px'}}
                            />
                        ))
                    }
                </g>
            </svg>
        </div>
    )

}

export default memo(NigeriaMap);