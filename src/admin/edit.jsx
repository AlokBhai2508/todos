import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase_setup/firebase';
import { useNavigate } from 'react-router-dom';


export default function Edit() {
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
