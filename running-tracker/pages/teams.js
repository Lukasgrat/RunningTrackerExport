import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Script from 'next/script';
import {useUser} from '@auth0/nextjs-auth0/client';
import Username from '../pages/userComponenets';
export default function Home() {
    const{user, error, isLoading} = useUser();
    const logTab = Username(user,error,isLoading);
    return (
            <div className={styles.container}>
                <header className ={styles.main}>
                    <title>Create Next App</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href=
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                    <Script src=
    "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                    </Script>
                    <Script src=
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                    </Script>
                    <nav class="navbar navbar-inverse navbar-fixed-top">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <a class="navbar-brand" href="\">Running Tracker</a>
                            </div>
                            <ul class="nav navbar-nav">
                                <li><a href="\" className={styles.Navtext}>Home</a></li>
                                <li><a href="\profile" className={styles.Navtext}>Profile</a></li>
                                <li><a href="\teams" className={styles.Navtext}>Team</a></li>
                                <li><a href="\races" className={styles.Navtext}>Races</a></li>
                                <li>{logTab}</li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <main className={styles.main}> 
                    <div class="container">
                        <div class="jumbotron text-center background-color: #b08802 !important">
                            <h1 className = {styles.heading}>Running Tracker</h1>
                        </div>
                    </div>
                    <div>
                        <table className= {styles.racesTable}>
                            <thead >
                                <tr>
                                    <th scope="col">Team</th>
                                    <th scope="col">Races</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Racing Polygon Team</td>
                                    <td>64K, GCN Marathon</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="button">Register Team</button>
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
