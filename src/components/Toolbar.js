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
            <div className="date-row">
                <div>
                    <p className="toolbar-heading">Today</p>

                <p>
                    <span className="case-data">{getToday().day + " " + getToday().month}</span>
                    <br/> {getToday().year}</p>
                </div>
                <div>
                    <p className="toolbar-heading">Day</p>
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
            <p className="">Last Updated: {byStateData.LastUpdated}</p>

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