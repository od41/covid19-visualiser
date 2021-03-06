import React, {useEffect, useState, useRef} from 'react';
import './App.css';
import ReactTooltip from 'react-tooltip';

// d3
// import WorldMap from './components/WorldMap';
import MapChart from './components/MapChart';
import NigeriaMapTwo from './components/NigeriaMapTwo';
import Toolbar from './components/Toolbar';

// get data

function App() {
  const [cData, setCdata] = useState({});
  const [rData, setRdata] = useState({});
  const [dData, setDdata] = useState({});
  const [byStateData, setByStateData] = useState({});
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({})
  const canvas = useRef();

  async function fetchData() {

    // URL endpoints data for each state
    const localStateUrl = "https://covid19ngr.herokuapp.com/api/states/";

    // URLs for total data for Nigeria
    const confirmedUrl = "https://api.covid19api.com/dayone/country/nigeria/status/confirmed";
    const recoveredUrl = "https://api.covid19api.com/dayone/country/nigeria/status/recovered";
    const deathsUrl = "https://api.covid19api.com/dayone/country/nigeria/status/deaths";
    
    fetch(confirmedUrl)
      .then(response => response.json())
      .then(info => setCdata(info))
      .catch(error => console.error(error));

    fetch(recoveredUrl)
      .then(response => response.json())
      .then(info => setRdata(info))
      .catch(error => console.error(error));

    fetch(deathsUrl)
      .then(response => response.json())
      .then(info => setDdata(info))
      .catch(error => console.error(error));

    fetch(localStateUrl)
      .then(response => response.json())
      .then(info => setByStateData(info))
      .catch(error => console.error(error));
  }

  useEffect(() => {

    fetchData();
    // check if remote data has loaded
    if(Object.getOwnPropertyNames(byStateData).length === 0) {
      // data has loaded
      setMounted(true);
    }

  }, []);

  useEffect(() => {
    // hook monitors the canvas element and updates on changes

    setDimensions({
      width: canvas.current.offsetWidth, 
      height: canvas.current.offsetHeight
    });
  }, [canvas.current]);

  const provideLatestData = (datum) => {
      const latest = datum[datum.length-1];
      return latest.Cases;
      // return 10;
  }

  
  return (
    
    <div className="App">


      <header>
        <div className="logo">
          Nigeria's Covid-19 Stats
        </div>

      </header>

      <section id="content">
        { cData.length && rData.length && dData.length ? <Toolbar lastUpdated={byStateData.LastUpdated} daysElapsed={cData.length} cData={provideLatestData(cData)} rData={provideLatestData(rData)} dData={provideLatestData(dData)} byStateData={byStateData} /> : "Loading data..."}
        {/* <img src={map}  className="nigeria-map" alt="map" /> */}
        {/* <WorldMap className="worldmap" /> */}
        {/* <MapChart className="worldmap" cData={cData} rData={rData} dData={dData} setTooltipContent={setContent} byStateData={byStateData} /> 
        <ReactTooltip>{content}</ReactTooltip> 
        */}
        
        <div ref={canvas} className="canvas">
          {/* if map is loaded properly display, else, don't */}
          {/* { mounted ? <NigeriaMap cData={cData} rData={rData} dData={dData} byStateData={byStateData} dimensions={dimensions}/> : "Loading map..." } */}
          { mounted ? <NigeriaMapTwo byStateData={byStateData} /> : "Loading map..." }
        </div>

      </section>

     

      
    </div>
  );
}

export default App;
