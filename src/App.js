import React, {useEffect, useState} from 'react';
import map from './assets/nigeria.svg';
import './App.css';

// d3
import WorldMap from './components/WorldMap';
import MapChart from './components/MapChart';

function App() {
  const [data, setData] = useState([50,12]);
  // const mapRef = useRef();

  useEffect(() => {
    // const map = select(mapRef.current);
    // console.log(map);
    // console.log(mapRef)
  }, [data]);
  
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
        <MapChart className="worldmap" />
      </section>

     

      <footer>
        <div>Data source <a href="#">NCDC</a>. | <a href="#">Stay safe</a></div>
        <div>Made by <a href="#">Odafe</a></div>
      </footer>
    </div>
  );
}

export default App;
