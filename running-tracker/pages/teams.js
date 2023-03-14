import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Script from 'next/script';
import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from '../componenets/navbar';
import { useReducer, useState } from "react";
const initialState = {
    teamNames: [],
    teamCodes: [],
};
export default function Home() {
    function reducer(state, action) {
        switch (action.type) {
            case "UPDATE_TEAM_NAMES":
                return {
                    ...state,
                    teamNames: action.payload.teamNames
                };
            case "UPDATE_TEAM_CODES":
                return {
                    ...state,
                    teamCodes: action.payload.teamCodes
                };
            case "CLEAR":
                return initialState;
            default:
                return state;
        }
    }
    
    const { user, error, isLoading } = useUser();
    const navigationBar = Navbar();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [data, setData] = useState([]);
    const TeamDisplay = ({vals}) => {
        return (<tr>
        <td>{vals[0]}</td>
        <td>{vals[1]}</td>
        </tr>);
    }
    const displayTeams  = () =>{
        var list = []
        for(var x =0; x < state.teamNames.length;x++){
            list.push(x);
        }
        return (
            (list || []).map(element => <TeamDisplay key={element} vals={[state.teamNames[element],state.teamCodes[element]]}/>)
          );
    }
    const teamHTML = displayTeams();
    const getTeams = async () => {
        const response = await fetch(`https://running-tracker-swart.vercel.app/api/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: user.email,
                isGet: true,
                isUpdate: false,
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const returnData = await response.json();
        console.log(returnData);
        var teams = [];
        var codes = [];
        for(var x = 0; x < returnData.length;x++){
            teams.push(returnData[x].teamName);
            codes.push(returnData[x].teamCode);
        }
         dispatch({
             type: "UPDATE_TEAM_NAMES",
             payload: {teamNames: teams}
         });
         dispatch({
             type: "UPDATE_TEAM_CODES",
             payload: {teamCodes: codes}
         });
        return returnData;
    }
    
    const setTeams = async (sendJson) => {
        const response = await fetch(`https://running-tracker-swart.vercel.app/api/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendJson)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const teams = await response.json();
        return teams;
    }
    const updateTeams = async (sendJson) => {
        const response = await fetch(`https://running-tracker-swart.vercel.app/api/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendJson)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const teams = await response.json();
        return teams;
    }
    if (!isLoading && user) {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <title>Teams</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href=
                        "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
                    <Script id = "2"src=
                        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                    </Script>
                    <Script id = "1"src=
                        "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                    </Script>

                    {navigationBar}
                    <Script
                    src="https://connect.facebook.net/en_US/sdk.js"
                    strategy="lazyOnload"
                    onLoad={() =>
                        {
                            console.log("60");
                            const teams = getTeams();
                        }
                    }
                    />
                </header>
                <main className={styles.main}>
                    <div class="container">
                        <h1 className={styles.jumbotron}>All in Run</h1>
                    </div><a
                        className={styles.card}
                    >
                        <h2>Teams</h2>
                        <p>Below are your joined teams and join codes! Send your codes to other racers for them to join aswell</p>
                    </a>
                    <div>
                        <table className={styles.racesTable}>
                            <thead >
                                <tr>
                                    <th scope="col">Team</th>
                                    <th scope="col">Join Code</th>
                                </tr>
                            </thead>
                            <tbody>
                               {teamHTML}
                            </tbody>
                        </table>
                    </div> <div>
                    
                        <table className= {styles.racesTable}>
                            <tbody>
                                <tr>
                                    <td>Team Name</td>
                                    <td><input id = "teamName" type = "text"></input></td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td><input id = "description" type = "text"></input></td>
                                </tr>  
                            </tbody>
                        </table>
                    </div>
                    <button type="button" id =  "createTeam">Register Team</button>
                    <div>
                        <table className= {styles.racesTable}>
                            <tbody>
                                <tr>
                                    <td>Join Code</td>
                                    <td><input id = "joinCode" type = "text"></input></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" id =  "updateTeam">Join a Team</button>
                </main>
                <Script
                    src="https://connect.facebook.net/en_US/sdk.js"
                    strategy="lazyOnload"
                    onLoad={() =>
                        {
                        const button = document.getElementById("createTeam");
                        var teamName = "";
                        var description = "";
                        button.addEventListener('click', () => {
                            teamName  = document.getElementById("teamName").value;
                            description = document.getElementById("description").value;
                            var sendJson = 
                                {
                                    'name' : teamName,
                                    'desc' : description,
                                    'isGet' :false,
                                    'isUpdate': false,
                                    'email' : user.email,
                                }
                                setTeams(sendJson);
                                getTeams();
                        })
                        const updateButton = document.getElementById("updateTeam");
                        var joinCode = "";
                        updateButton.addEventListener('click', () => {
                            joinCode  = document.getElementById("joinCode").value;
                            if(joinCode == ""){
                                joinCode = "a";
                            }
                            var sendJson = 
                                {
                                    'code' : joinCode,
                                    'isGet' :false,
                                    'isUpdate': true,
                                    'email' : user.email,
                                }
                                updateTeams(sendJson);
                                getTeams();
                        })
                    }
                    }    
                />
                <footer className={styles.footer}>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by Power{' '}
                        <span className={styles.logo}>
                        </span>
                    </a>
                </footer>
            </div>
        )
    }
}
