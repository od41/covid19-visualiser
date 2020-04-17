import React, {useEffect, useState} from 'react';
import map from './assets/nigeria.svg';
import './App.css';
import ReactTooltip from 'react-tooltip';

// d3
import WorldMap from './components/WorldMap';
import MapChart from './components/MapChart';

// get data

function App() {
  const [cData, setCdata] = useState({});
  const [rData, setRdata] = useState({});
  const [dData, setDdata] = useState({});
  const [byStateData, setByStateData] = useState({});
  const [content, setContent] = useState("");
  // const mapRef = useRef();

  async function fetchData() {

    const localStateUrl = "covid-cases-in-nigeria-by-state.json";

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
  }, []);

  
  return (

    
    <div className="App">

      <header>
        <div className="logo">
          <strong>Covid-19</strong> in Nigeria
        </div>

        <nav>
          <ul>
            <li><button className="active">Infection spread</button></li>
            <li><button>Current infections</button></li>
            <li><button>Risk Assesments</button></li>
          </ul>
        </nav>

        <div className="time">
          <div className="meta">26 Mar 2020</div>
          <div className="meta">12:20:23</div>
        </div>

      </header>

      <section id="map">
        {/* <img src={map}  className="nigeria-map" alt="map" /> */}
        {/* <WorldMap className="worldmap" /> */}
        <MapChart className="worldmap" cData={cData} rData={rData} dData={dData} setTooltipContent={setContent} byStateData={byStateData} />
        <ReactTooltip>{content}</ReactTooltip>
        <h5>Last Updated: {byStateData.LastUpdated} </h5>
      </section>

     

      <footer>
        <div>Data source <a href="#">NCDC</a>. | <a href="#">Stay safe</a></div>
        <div>Made by <a href="#">Odafe</a></div>
      </footer>
    </div>
  );
}

export default App;
