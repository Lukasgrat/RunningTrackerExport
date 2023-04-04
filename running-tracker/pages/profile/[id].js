import styles from '../../styles/Home.module.css'
import Script from 'next/script';
import {useUser} from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import PFP from '../../images/defaultPFP.png';
import CHART from '../../images/chart.png';
import Navbar from '../../componenets/navbar.js';
import {useReducer, useState} from "react";

function reducer(state, action) {
    switch (action.type) {
        case "UPDATE_MOSTDONERACE":
            return {
                ...state,
                mostDoneRace: action.payload.mostDoneRace
            };
        case "UPDATE_AVERAGERACETIME":
            return {
                ...state,
                averageRaceTime: action.payload.averageRaceTime
            };
        case "UPDATE_BESTRACETIME":
            return {
                ...state,
                bestRaceTime: action.payload.bestRaceTime
            };
        case "UPDATE_TRENDOFRACES":
            return {
                ...state,
                trendOfRaces: action.payload.trendOfRaces
            };
        case "CLEAR":
            return initialState;
        default:
            return state;
    }
}

const initialState = {
    mostDoneRace:0,
    averageRaceTime:0,
    bestRaceTime:0,
    trendOfRaces:"",
};

export default function Profile() {
    const {user, error, isLoading} = useUser();
    const navigationBar = Navbar();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [data, setData] = useState([]);

    const putRunDataInDatabase = async (sendJson) => {
        const response = await fetch(`http://localhost:3000/api/stat-tracking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendJson)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const runData = await response.json();
        var length = Object.keys(runData).length;
        if(length > 0){
            var distanceList = [];
            var countList = [];
            for(var x = 0; x < length;x++){
                var hasFoundDistance = false;
                for(var z = 0; z < distanceList.length;z++){
                    if(distanceList[z] == runData[x].runLength){
                        countList[z]++;
                        hasFoundDistance = true;
                    }
                }
                if(!hasFoundDistance){
                    distanceList.push(runData[x].runLength);
                    countList.push(0);
                }
            }
            var largestIndex = 0;
            for(var x = 0; x < countList.length;x++){
                if(countList[x] > countList[largestIndex]){
                    largestIndex = x;
                }
            }
            console.log(countList);
            console.log(distanceList);
            dispatch({
                type: "UPDATE_MOSTDONERACE",
                payload: {mostDoneRace: distanceList[largestIndex]}
            });
            var fastestDistance = 100000000;
            var sumTime = 0;
            var count  = 0;
            var previousRaceTime = 0;
            var differenceList = []
            for(var x = 0; x < length; x++){
                if(distanceList[largestIndex] == runData[x].runLength){
                    var stringTime = runData[x].runTime.split(":");
                    console.log(stringTime);
                    count++;
                    var intTime = parseInt(stringTime[0]) * 3600 + parseInt(stringTime[1]) * 60 + parseInt(stringTime[1]);
                    if(count == 1){
                        previousRaceTime = intTime;
                    }
                    else{
                        differenceList.push(intTime-previousRaceTime);
                    }
                    sumTime += intTime;
                    if(intTime< fastestDistance){
                        fastestDistance = intTime;
                    }
                }
            }  
            dispatch({
                type: "UPDATE_BESTRACETIME",
                payload: {bestRaceTime: (Math.trunc(fastestDistance/60))}
            });
            dispatch({
            type: "UPDATE_AVERAGERACETIME",
            payload: {averageRaceTime: (Math.trunc(sumTime/60/count))}
        });
        if(differenceList.length > 0){
            var sumOfDistances = 0;
            for(var y = 0; y < differenceList.length;y++){
                sumOfDistances += differenceList[y];
            }
            var slope = sumOfDistances/60/differenceList.length;
            if(slope < 0){
                dispatch({
                type: "UPDATE_TRENDOFRACES",
                payload: {trendOfRaces: "You have improved your time on average by "+-1*slope.toFixed(2)+" minutes per run."}
                });
            }
            else if(slope > 0 ){
                dispatch({
                    type: "UPDATE_TRENDOFRACES",
                    payload: {trendOfRaces: "You have worsened your time on average by "+slope.toFixed(2)+" minutes per run."}
                    });
            }
            else{
                dispatch({
                    type: "UPDATE_TRENDOFRACES",
                    payload: {trendOfRaces: "There hasn't been a major change in your race times"}
                    });
            }
        }
        }
        return runData[0];
    }
    const getRunDataFromDatabase = async (sendJson) => {
        const response = await fetch(`http://localhost:3000/api/stat-tracking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendJson)
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const runData = await response.json();
        var length = Object.keys(runData).length;
        if(length > 0){
            var distanceList = [];
            var countList = [];
            for(var x = 0; x < length;x++){
                var hasFoundDistance = false;
                for(var z = 0; z < distanceList.length;z++){
                    if(distanceList[z] == runData[x].runLength){
                        countList[z]++;
                        hasFoundDistance = true;
                    }
                }
                if(!hasFoundDistance){
                    distanceList.push(runData[x].runLength);
                    countList.push(0);
                }
            }
            var largestIndex = 0;
            for(var x = 0; x < countList.length;x++){
                if(countList[x] > countList[largestIndex]){
                    largestIndex = x;
                }
            }
            console.log(countList);
            console.log(distanceList);
            dispatch({
                type: "UPDATE_MOSTDONERACE",
                payload: {mostDoneRace: distanceList[largestIndex]}
            });
            var fastestDistance = 100000000;
            var sumTime = 0;
            var count  = 0;
            var previousRaceTime = 0;
            var differenceList = []
            for(var x = 0; x < length; x++){
                if(distanceList[largestIndex] == runData[x].runLength){
                    var stringTime = runData[x].runTime.split(":");
                    console.log(stringTime);
                    count++;
                    var intTime = parseInt(stringTime[0]) * 3600 + parseInt(stringTime[1]) * 60 + parseInt(stringTime[1]);
                    if(count == 1){
                        previousRaceTime = intTime;
                    }
                    else{
                        differenceList.push(intTime-previousRaceTime);
                        console.log(intTime-previousRaceTime);
                        previousRaceTime = intTime;
                    }
                    sumTime += intTime;
                    if(intTime< fastestDistance){
                        fastestDistance = intTime;
                    }
                }
            }  
            dispatch({
                type: "UPDATE_BESTRACETIME",
                payload: {bestRaceTime: (Math.trunc(fastestDistance/60))}
            });
            dispatch({
            type: "UPDATE_AVERAGERACETIME",
            payload: {averageRaceTime: (Math.trunc(sumTime/60/count))}
        });
        if(differenceList.length > 0){
            var sumOfDistances = 0;
            for(var y = 0; y < differenceList.length;y++){
                console.log(differenceList[y]);
                sumOfDistances += differenceList[y];
            }
            var slope = sumOfDistances/60/differenceList.length;
            console.log(slope);
            if(slope < 0){
                dispatch({
                type: "UPDATE_TRENDOFRACES",
                payload: {trendOfRaces: "You have improved your time on average by "+ -1*slope.toFixed(2)+" minutes per run."}
                });
            }
            else if(slope > 0 ){
                dispatch({
                    type: "UPDATE_TRENDOFRACES",
                    payload: {trendOfRaces: "You have worsened your time on average by "+slope.toFixed(2)+" minutes per run."}
                    });
            }
            else{
                dispatch({
                    type: "UPDATE_TRENDOFRACES",
                    payload: {trendOfRaces: "There hasn't been a major change in your race times"}
                    });
            }
        }
        }
        return runData[0];
    }

    let person;

    if (!isLoading && user) {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <title>All in Run | Profile</title>
                    <link rel="icon" href="/favicon.ico"/>
                    <link
                        rel="stylesheet"
                        href=
                            "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                    <Script  id = "1" src=
                                "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                    </Script>
                    <Script id = "2" src=
                                "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                    </Script>
                    {navigationBar}
                    <Script
                        src="https://connect.facebook.net/en_US/sdk.js"
                        strategy="lazyOnload"
                        onLoad={
                            () => {  let sendData = [{
                                email: user.email,
                                isGet: true
                            }]
                                getRunDataFromDatabase(sendData);
                            }
                        }
                    />
                </header>
                <main className={styles.main}>
                    <h3 className={styles.outsideText}>Welcome {user.name}</h3>
                    <div className={styles.grid}>
                        <a className={styles.card}>
                            <Image className={styles.image} src={PFP} alt="profile picture" width={300} height={444}/>
                        </a>
                        <a className={styles.profileCard}>
                            <h4>Name: {user.name}</h4>
                            <h4>Prefered Running Distance: {state.mostDoneRace}km</h4>
                            <h4>Average Running Time for Prefered Distance: {state.averageRaceTime} minutes</h4>
                            <h4>Best Race Time for Prefered Distance: {state.bestRaceTime} minutes</h4>
                            <h4>Trend of Preferred Races: {state.trendOfRaces}</h4>
                        </a>
                    </div>
                    <table className= {styles.racesTable}>
                    <h3 className={styles.stats}>Input a new race below</h3>
                    <div className={styles.grid}>
                        <th className='inputGrid'>
                            <td><h3>Length(km)</h3></td>
                            <td> <input id="raceDistance" type="text" color=''></input></td>
                        </th>
                        <tr> 
                            <td><h3>Hours</h3></td>
                            <td><input id="hours" type="text"></input></td>
                        </tr>
                        <tr> 
                            <td><h3>Minutes</h3></td>
                            <td><input id="minutes" type="text"></input></td>
                        </tr>
                        <tr> 
                            <td><h3>Seconds</h3></td>
                            <td><input id="seconds" type="text"></input></td>
                        </tr>
                    </div>
                    </table>
                    <button id="addDataButton">Insert Data</button>
                    <Script
                        src="https://connect.facebook.net/en_US/sdk.js"
                        strategy="lazyOnload"
                        onLoad={() => {
                            let distance = "";
                            let time = "";
                            let hours = "";
                            let minutes = "";
                            let seconds = "";
                            const button = document.getElementById('addDataButton');
                            button.addEventListener('click', () => {
                                distance = document.getElementById("raceDistance").value;
                                hours = document.getElementById("hours").value;
                                minutes = document.getElementById("minutes").value;
                                seconds = document.getElementById("seconds").value;
                                if(parseInt(distance,10).toString()===distance && parseInt(distance,10) >= 0&&parseInt(hours,10).toString()===hours && parseInt(hours,10) >= 0&&parseInt(minutes,10).toString()===minutes && parseInt(minutes,10) >= 0&&parseInt(seconds,10).toString()===seconds && parseInt(seconds,10) >= 0){
                                    time = hours + ":" + minutes + ":"+seconds;
                                    alert("Inserted run with distance of "+distance+" kms and time of "+time);
                                    let sendData = [{
                                        distance: distance,
                                        time: time,
                                        isGet:false,
                                        email: user.email
                                    }]
                                    putRunDataInDatabase(sendData);
                                }
                                else{
                                    alert("Please enter in only whole number times and distances for your races.");
                                }
                            })
                        }
                        }
                    />
                </main>
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <title>All in Run | Login</title>
                    <link rel="icon" href="/favicon.ico"/>
                    <link
                        rel="stylesheet"
                        href=
                            "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                    <Script id = "3" src=
                                "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                    </Script>
                    <Script id = "4" src=
                                "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                    </Script>
                    {navigationBar}
                </header>
                <main className={styles.main}>
                    <div class="container">
                        <div class="jumbotron text-center background-color: #b08802 !important">
                            <h1 className={styles.heading}></h1>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}