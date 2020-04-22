import React, { memo, useEffect } from 'react';

const Toolbar = ({cData, rData, dData, byStateData}) => {

    const selectLatest = () => {
        const cLatest = cData[cData.length-1];
        // const cCase = cLatest.Cases;

        const rLatest = rData[rData.length-1];
        // const rCase = rLatest.Cases;
        
        const dLatest = dData[dData.length-1];
        // const dCase = dLatest.Cases;

        // console.log(cData, rData, dData)
        // console.log(cLatest, rLatest, dLatest)
        return {cCase, rCase, dCase}
    }

    let cCase;
    let rCase;
    let dCase;

    useEffect(() => {
        const caseNumber = selectLatest();
        // cCase = caseNumber.cCase;
        // rCase = caseNumber.rCase;
        // dCase = caseNumber.dCase;
         
    }, [cData])

    // TODO
    const handleRefresh = () => {
        window.alert("Refreshing!")
    }

    // TODO
    const handleIsItSafe = () => {
        window.alert("Is it really safe?")
    }

    return (
        <div className="toolbar" >
            <div className="date-row">
                <div>
                    <p className="toolbar-heading">Today</p>

                    <p><span className="case-data">22 Apr.</span><br/> 2020</p>
                </div>
                <div>
                    <p className="toolbar-heading">Day</p>
                    <p><span className="case-data">55</span> <br/>days since first confirmed case</p>
                </div>
            </div>

            <hr />

            <div className="cases">
                <p className="toolbar-heading">Cases</p>

{/* TODO */}
                <div className="current">
                    <p className="label">Active</p>
                    <p className="case-data">{/*{cCase - rCase - dCase}*/}210</p> 
                </div>
                <div className="recovered">
                    <p className="label">Recovered</p>
                    <p className="case-data">{rCase}150</p>
                </div>
                <div className="deaths">
                    <p className="label">Deaths</p>
                    <p className="case-data">{dCase}10</p>
                </div>
            </div>

            <p className="">Total cases: 700{cCase}</p>
            <p className="">Last Updated: {byStateData.LastUpdated}</p>

            <div className="btn-row">
                <button onClick={handleRefresh} className="btn">Refresh</button>
                <button onClick={handleIsItSafe} className="btn">Is it safe?</button>
            </div>

            <hr />

            <div className="footer">
                <p>Data source <a href="#">NCDC</a>.</p>
                <p>Made by <a href="#">Odafe</a></p>
            </div>
        </div>
    ) 
}

export default memo(Toolbar);