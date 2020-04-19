import React, {useEffect, useState, memo} from 'react';
import {csv, scaleLinear, geoPath} from 'd3';
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule
} from 'react-simple-maps';
import nigeria from '../nigeria.json';

// const geoUrl =
  // "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

//   const naijaUrl = "https://github.com/deldersveld/topojson/blob/master/countries/nigeria/nigeria-states.json"
// const naijaUrl =  fetch('/nigeria-states.json');


const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = ({cData, rData, dData, byStateData, setTooltipContent}) => {

    return (
        <ComposableMap
          // projection={geoMillerRaw()}
          data-tip=""
          projectionConfig={{  
              parallels: [0.8, 1],
              rotate: [-7, -10, 0],
              scale: 2500
            }}
        >
          {/* <Sphere stroke="#E4E5E6" strokeWidth={5} /> */}
          {/* <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
          {/* { (data.length !== 0 ? console.log(data[data.length-1]) : console.log('no data'))
            
          } */}
            <Geographies geography={nigeria}>
              {({ geographies }) =>
                geographies.map(geo => {
                //   const d = data.find(s => s.ISO3 === geo.properties.ISO_A3);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      // onMouseEnter={() => {
                      //   const {NAME_1} = geo.properties;
                      //   const cLatest = cData[cData.length-1];
                      //   const cCase = cLatest.Cases;

                      //   const rLatest = rData[rData.length-1];
                      //   const rCase = rLatest.Cases;
                        
                      //   const dLatest = dData[dData.length-1];
                      //   const dCase = dLatest.Cases;
                      //   setTooltipContent(`${NAME_1} \n
                      //                       Confirmed: ${cCase} \n
                      //                       Recovered: ${rCase} \n
                      //                       Dead: ${dCase} `);
                      // }}
                      onMouseEnter={() => {
                        const {NAME_1} = geo.properties;
                        console.log(cData)

                        
                        if(byStateData.states !== undefined ){
                          setTooltipContent(`${NAME_1} \n
                                            Confirmed: ${byStateData.states[NAME_1].confirmed} \n
                                            Recovered: ${byStateData.states[NAME_1].recovered} \n
                                            Dead: ${byStateData.states[NAME_1].deaths}
                                             `);
                        }
                        
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: "#F5F4F6",
                          stroke: "#000000"
                        },
                        hover: {
                          fill: "#169CCD",
                          stroke: "none"
                        }
                      }}

                      
                    />
                  );
                })
              }
            </Geographies>
        </ComposableMap>
      );
}

export default memo(MapChart);
