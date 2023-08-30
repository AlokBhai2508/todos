
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, } from 'firebase/auth';
import { auth, } from '../firebase_setup/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import "./dashboard.css";
import { Link, useNavigate } from 'react-router-dom';
export default function New() {
    const navigate = useNavigate();
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
    if (isLogged != null) {
        if (!isLogged) {
            navigate("/admin")
            // console.log(555656)
        }
    }
    return (
        <div>

        </div>
    )
}
