import React, { useEffect, useState } from 'react'
import "../css/editSetModal.css"
import TagInput from './tagInput';
import { addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase_setup/firebase';

export default function EditSetModal({ open, close, det, type }) {
    const [update, setUpdate] = useState({})
    if (!open) return null;
    const handleSubmit = () => {
        getDoc(doc(firestore, type, det.slug)).then((e) => {
            let val = e.data()
            setDoc(doc(firestore, type, det.slug), {
                ...val,
                ...update
            })
        })
    }
    // console.log(det)
    return (
        <div className="modal-main">
            <div className="box">
                <div className="top">
                    <h1>Settings</h1>
                    <button
                        onClick={() => handleSubmit()}
                    >Save</button>
                    <button
                        onClick={close}
                    ><h1>X</h1></button>

                </div>
                {det ? <>
                    <div className="modal-content-corner">
                        <TagInput tag={det.tags} onChange={(arr) => setUpdate({ ...update, tags: arr })} />
                </div>
                </> : null}
            </div>
        </div>
    )
}
