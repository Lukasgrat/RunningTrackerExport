import styles from '../styles/Home.module.css'
import Script from 'next/script';
import {useUser} from '@auth0/nextjs-auth0/client';
import Navbar from '../componenets/navbar';
import Cookies from 'js-cookie';
const Races = ({ races }) => {
    const{user, error, isLoading} = useUser();  
    var userID = "";
    userID = Cookies.get('id');
    const navigationBar = Navbar(userID);
    const putRaceInDatabase = async (sendJson) => {
        const response = await fetch(`https://running-tracker-swart.vercel.app///api/races`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendJson)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const races = await response.json();
        console.log(races);
        return;
    }
    if(user && !isLoading&& (Cookies.get("roleID") == 1|| Cookies.get("roleID")==2)){
    return (
            <div className={styles.container}>
                <header className ={styles.header}>
                    <title>Races</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href=
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                    <Script id = "1" src=
    "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                    </Script>
                    <Script id = "2" src=
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                    </Script>
                    {navigationBar}
                </header>
                <main className={styles.main}> 
                    <div class="container">
                        <div className = {styles.card}>
                        <h1 >Welcome Organizer</h1>
                        <h3>Please enter your race info below</h3>
                        </div>
                      
                    </div>
                    <h3>Insert info here</h3>
                    <div>
                        <table className= {styles.formTable}>
                            <tbody id = "races">
                                <tr>
                                    <td>Race Name/Type</td>
                                    <td><input id = "raceName" type = "text"></input></td>
                                </tr>
                                <tr>
                                    <td>Date</td>
                                    <td><input id = "time" type = "date"></input></td>
                                </tr>  
                                <tr>
                                    <td>Location</td>
                                    <td><input id = "location" type = "text"></input></td>
                                </tr>
                                
                                <tr>
                                    <td>Distance (kms)</td>
                                    <td><input id = "distance" type = "text" className={styles.inLine}></input></td>
                                </tr> 
                                <tr>
                                    <td>Contact Info</td>
                                    <td><input id = "contact" type = "text" className={styles.inLine}></input></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <input id = "formSubmission" type = "button" value = "Submit" href = "/races" ></input>
                </main>
                <Script
                    src="https://connect.facebook.net/en_US/sdk.js"
                    strategy="lazyOnload"
                    onLoad={() =>
                        {
                        const button = document.getElementById("formSubmission");
                        var raceName = "";
                        var time = "";
                        var location = "";
                        var distance = "";
                        var contact = "";
                        button.addEventListener('click', () => {
                            raceName  = document.getElementById("raceName").value;
                            time = document.getElementById("time").value;
                            location = document.getElementById("location").value;
                            distance = document.getElementById("distance").value;
                            contact = document.getElementById("contact").value;
                            if(parseInt(distance,10).toString()===distance && parseInt(distance,10) >= 0){
                                if(raceName.length < 30){
                                    var sendJson = 
                                        {
                                            'name': raceName,
                                            'time': time,
                                            'location': location,
                                            'distance': distance,
                                            'contact':contact,
                                        }
                                    putRaceInDatabase(sendJson);
                                    alert("You inserted the following race with a distance of "+distance+" named"+raceName);
                                }
                                else{
                                    alert("Please use a shorter race name");
                                }
                            }
                            else{
                                alert("Please enter the distance of the run to the nearest integer and make it positive.");
                            }
                    }
                        )
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
    else if(!isLoading){
        location.href = "/";
    }
}
export default Races;