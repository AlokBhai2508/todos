import React, { useEffect, useState } from 'react'
import "./login.css";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase_setup/firebase';
import NotLogged from './notLoged';









export default function Dashboard() {

    const [isLogged, setIsLoged] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoged(true)
            } else {
                // User is signed out
                // ...
                setIsLoged(false)
            }
        });

    }, [])


    function Logged() {
        return (
            <>
                <button
                    onClick={() => { signOut(auth).then(() => { setIsLoged(false) }) }}
                >Log Out</button>
            </>
        )
    }
    console.log(!isLogged)
    return (
        <>
            {isLogged ? <Logged /> : (isLogged === null ? null : <NotLogged />)}
        </>
    )
}






