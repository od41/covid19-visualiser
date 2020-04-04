import React, {useEffect, useState} from 'react';
import {csv, scaleLinear, geoPath,  geoAlbersUsa} from 'd3';
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule
} from 'react-simple-maps';
import nigeria from '../nigeria.json';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

//   const naijaUrl = "https://github.com/deldersveld/topojson/blob/master/countries/nigeria/nigeria-states.json"
// const naijaUrl =  fetch('/nigeria-states.json');


const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        csv(`/vulnerability.csv`).then(data => {
            setData(data);
          });

    }, [])

    return (
        <ComposableMap
        //   projection={geoAlbersUsa()}
          projectionConfig={{  
              parallels: [0.8, 1],
              rotate: [-7, -10, 0],
              scale: 2500
            }}
        >
          {/* <Sphere stroke="#E4E5E6" strokeWidth={5} /> */}
          {/* <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
          
            <Geographies geography={nigeria}>
              {({ geographies }) =>
                geographies.map(geo => {
                //   const d = data.find(s => s.ISO3 === geo.properties.ISO_A3);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={"#F5F4F6"}
                      stroke={"#000000"}
                    />
                  );
                })
              }
            </Geographies>
        </ComposableMap>
      );
}

export default MapChart;
