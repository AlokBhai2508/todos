import React, { useState } from 'react'
import "../css/Modal.css";
import { addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase_setup/firebase';
import { useNavigate } from 'react-router-dom';

const NewModal = ({ open, close }) => {
    const navigate = useNavigate()
    const [details, setDetails] = useState({ slug: "", title: "" });
    if (!open) return null;
    const handleSubmit = () => {
        // firestore.collection("drafts").doc(details.slug).add({
        //     "he": 15
        // })
        getDoc(doc(firestore, "drafts", details.slug)).then((val) => {
            setDoc(doc(firestore, "drafts", details.slug), {
                ...val.data(),
                ...details
            })
        }).then(
            navigate("/edit/drafts/" + details.slug)
        )


    }
    return (
        <>
            <div className="modal-main">
                <div className="box">
                    <div className="top">
                        <h1>Add New Blog</h1>
                        <button
                            onClick={close}
                        ><h1>X</h1></button>

                    </div>
                    <div className='modal-content'>
                        <h4>Slug</h4>
                        <input type="text"
                            onChange={(val) => details.slug = val.target.value}
                        />

                        <h4>title</h4>
                        <input type="text"
                            onChange={(val) => details.title = val.target.value} />
                        <button
                            onClick={() => handleSubmit()}
                        >
                            submit
                        </button>

                    </div>
                </div>
            </div>
        </>
    )

}

export default NewModal;
