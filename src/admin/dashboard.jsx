import React, { useEffect, useState } from 'react'
import "./login.css";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase_setup/firebase';









export default function Dashboard() {

    const [isLogged, setIsLoged] = useState(false)
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





    function NotLogged() {
        const [details, setDetails] = useState({ email: "", pass: "" });
        const sub = () => {
            console.log(details)
            signInWithEmailAndPassword(auth, details.email, details.pass).then((user) => {
                console.log(user)
                setIsLoged(true);
            }).catch((e) => {
                console.log(e)
            })
        }
        return (

            <div id="loginform">
                <h2 id="headerTitle">Login</h2>

                <FormInput description="Username" placeholder="Enter your username" type="text" onChange={e => setDetails({ ...details, email: e.target.value })} />
                <FormInput description="Password" placeholder="Enter your password" type="password" onChange={e => setDetails({ ...details, pass: e.target.value })} />
                <div id="button" class="row">
                    <button
                        onClick={() => sub()}
                    >Submit</button>
                </div>

            </div>

        )

    }
    function Logged() {
        return (
            <>
                <button
                    onClick={() => { signOut(auth).then(() => { setIsLoged(false) }) }}
                >Log Out</button>
            </>
        )
    }

    return (
        <>
            {isLogged ? <Logged /> : <NotLogged />}
        </>
    )
}


const FormInput = props => (
    <div class="row">
        <label>{props.description}</label>
        <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
    </div>
);



