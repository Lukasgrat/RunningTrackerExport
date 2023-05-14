import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Script from 'next/script';
import Link from 'next/link';
import {useUser} from '@auth0/nextjs-auth0/client';
import Navbar from '../componenets/navbar';
import Cookies from 'js-cookie';
const db = require('../db/db_connection.js')

const Races = ({ races }) => {
    const{user, error, isLoading} = useUser();  
    var userID = "";
    userID = Cookies.get('id');
    const navigationBar = Navbar(userID);
    var x = Object.keys(races).length;
    const raceList = [];
    for(var key  = 0; key < x;key++){
        raceList[key] = races[key];
    }
    const displayedRaces = displayRaces(raceList);
    if (!isLoading && user && (Cookies.get("roleID") == 1|| Cookies.get("roleID")==2)) {
        var formLink = "/raceForm/"+userID;
        var adminLink = "/admin/"+userID;
        if(Cookies.get("roleID") == 1){
            return (
                    <div className={styles.racesImage}>
                        <header className ={styles.header}>
                            <title>Races</title>
                            <meta name="description" content="Generated by create next app" />
                            <link rel="icon" href="/favicon.ico" />
                            <link
                                rel="stylesheet"
                                href=
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                            <Script id = "4" src=
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                            </Script>
                            <Script id = "5"src=
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                            </Script>
                            {navigationBar}
                        </header>
                        <main className={styles.mainImage}> 
                            <div class="container">
                                <h1 className = {styles.jumbotronRace}>Races</h1>
                            </div>
                            <div>
                                <table className= {styles.racesTable}>
                                    <thead >
                                        <tr>
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th>Location</th>
                                            <th>Length</th>
                                            <th>Contact Info</th>

                                        </tr>
                                    </thead>
                                    <tbody id = "races">
                                        {displayedRaces}
            
                                    </tbody>
                                </table>
                            </div>
                            <div className= {styles.createRaceCard}>
                                <Link className={styles.card} id = "linkToForm" href = {formLink}>Manage Races</Link>
                            </div>
                        </main>

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
        else{
            return (
                <div className={styles.racesImage}>
                    <header className ={styles.header}>
                        <title>Races</title>
                        <meta name="description" content="Generated by create next app" />
                        <link rel="icon" href="/favicon.ico" />
                        <link
                            rel="stylesheet"
                            href=
        "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                        <Script id = "4" src=
        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                        </Script>
                        <Script id = "5"src=
        "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                        </Script>
                        {navigationBar}
                    </header>
                    <main className={styles.mainImage}> 
                        <div class="container">
                            <h1 className = {styles.jumbotronRace}>Races</h1>
                        </div>
                        <div>
                            <table className= {styles.racesTable}>
                                <thead >
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Location</th>
                                        <th>Length</th>
                                        <th>Contact Info</th>

                                    </tr>
                                </thead>
                                <tbody id = "races">
                                    {displayedRaces}
        
                                </tbody>
                            </table>
                        </div>
                        <div className= {styles.createRaceCard}>
                            <Link className={styles.card} id = "linkToForm" href = {formLink}>Manage Races</Link>
                        </div>
                        <div className= {styles.createRaceCard}>
                            <Link className={styles.card} id = "linkToForm" href = {adminLink}>Manage Users</Link>
                        </div>
                    </main>

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
    else{
        return (
            <div className={styles.racesImage}>
                <header className ={styles.header}>
                    <title>Races</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href=
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                    <Script id = "2"src=
    "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                    </Script>
                    <Script  id = "1"src=
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                    </Script>
                    {navigationBar}
                </header>
                <main className={styles.mainImage}> 
                    <div class="container">
                        <h1 className = {styles.jumbotronRace}>Races</h1>
                    </div>         
                    <div>
                        <table className= {styles.racesTable}>
                            <thead >
                                <tr>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Length</th>
                                    <th>Contact Info</th>

                                </tr>
                            </thead>
                            <tbody id = "races">
                                {displayedRaces}
    
                            </tbody>
                        </table>
                    </div>
                </main>

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

export async function getServerSideProps(context) {
    const [rows, fields] = await db.execute('SELECT * FROM Race');
    let results = JSON.parse(JSON.stringify(rows));
    return {
        props: { races: results }
    };
}
const RaceDisplay = ({race}) => {
    let display = new Date(race.raceDate);
    return (<tr>
    <td>{race.raceName}</td>
    <td>{display.getMonth()+1}/{display.getDate()}/{display.getFullYear()}</td>
    <td>{race.raceLocation}</td>
    <td>{race.raceLength}km</td>
    <td>{race.Signup}</td>
    </tr>);
}
const displayRaces = ( raceArray ) => { 
    return (
      (raceArray || []).map(race => <RaceDisplay key={race.raceID} race={race} />)
    );
   }
export default Races;