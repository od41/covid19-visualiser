import React, { memo, useEffect } from 'react';

const Toolbar = ({cData, rData, dData, byStateData, daysElapsed}) => {

   

    // let cCase;
    // let rCase;
    // let dCase;

    useEffect(() => {
        
         
    })

    const getToday = () => {
        const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]
        let today = new Date();
        let date = {
            year: today.getFullYear(),
            month: months[today.getMonth()], 
            day: today.getDate()
        };
        // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        
        return date;
    }

    // TODO
    const handleRefresh = () => {
        window.alert("Refreshing!")
    }

    // TODO
    const handleIsItSafe = () => {
        window.alert("Short answer, No.")
    }

    return (
        <div className="toolbar" >
            <div className="touch-indicator">
                <span className="hide-on-mobile toolbar-heading">Hover cursor over map</span>

                <span className="hide-on-desktop toolbar-heading"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 167.63 232.39" className="touch-icon"><path  d="M177.12,83.26a22.81,22.81,0,0,0-15.39,6,22.88,22.88,0,0,0-30.8,0,23.13,23.13,0,0,0-5.64-3.76,52.35,52.35,0,1,0-63.44,14v63.87a69.08,69.08,0,0,0,138.16,0V106.15A22.92,22.92,0,0,0,177.12,83.26ZM47.38,52.37a37.37,37.37,0,1,1,60.27,29.51V52.37a22.9,22.9,0,1,0-45.8,0V81.88A37.5,37.5,0,0,1,47.38,52.37ZM185,163.32a54.08,54.08,0,0,1-108.16,0V94.89q0-.37,0-.75V52.37a7.9,7.9,0,1,1,15.8,0V122.6a7.5,7.5,0,0,0,15,0V106.15a7.89,7.89,0,0,1,15.78,0V122.6a7.5,7.5,0,0,0,15,0V106.15a7.9,7.9,0,0,1,15.8,0V122.6a7.5,7.5,0,0,0,15,0V106.15a7.89,7.89,0,1,1,15.78,0v57.17Z" transform="translate(-32.38)" style={{fill:"#e3f7fc"}}/></svg> Touch the map</span>
            </div>
            <div className="date-row">
                <div>
                    <p className="toolbar-heading">Today is</p>

                <p>
                    <span className="case-data">{getToday().day + " " + getToday().month}</span>
                    <br/> {getToday().year}</p>
                </div>
                <div>
                    <p className="toolbar-heading">Duration</p>
                    <p><span className="case-data">{daysElapsed}</span> <br/>days since first confirmed case</p>
                </div>
            </div>

            <hr />

            <div className="cases">
                <p className="toolbar-heading">Cases</p>

{/* TODO */}
                <div className="current">
                    <p className="label">Active</p>
                    <p className="case-data">{cData-rData-dData}</p> 
                </div>
                <div className="recovered">
                    <p className="label">Recovered</p>
                    <p className="case-data">{rData}</p>
                </div>
                <div className="deaths">
                    <p className="label">Deaths</p>
                    <p className="case-data">{dData}</p>
                </div>
            </div>

            <p className="">Total cases: {cData}</p>
            {/* <p className="">Last Updated: {byStateData.LastUpdated}</p> */}

            <div className="btn-row">
                {/* <button onClick={handleRefresh} className="btn">Refresh</button> */}
                <button onClick={handleIsItSafe} className="btn">Is it safe to go out?</button>
            </div>

            <hr />

            <div className="footer">
                <p>Data by state breakdown sourced from the <a href="https://covid19.ncdc.gov.ng/">Nigerian CDC</a> & aggregate data from <a href="https://github.com/CSSEGISandData/COVID-19">John Hopkins CSSE</a> served via <a href="https://covid19api.com/">Covid19api</a>.</p>
                <p>Made by <a href="https://odafe41.com">Odafe</a></p>
            </div>
        </div>
    ) 
}

export default memo(Toolbar);