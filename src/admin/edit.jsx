import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, firestore } from '../firebase_setup/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import EditSetModal from '../My Cmponents/editSetModal';


export default function Edit() {
    const navigate = useNavigate();
    const [isLogged, setIsLoged] = useState(null)
    const [blog, setBlog] = useState({});
    const [modalSet, setModalSet] = useState(false);
    const { blogSlug, type } = useParams()
    const handleSave = () => {
        console.log(blog)
        setDoc(doc(firestore, type, blogSlug), blog)
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoged(true)
            } else {

                setIsLoged(false)
            }
        });

    }, [])

    useEffect(() => {
        console.log(blogSlug, type)
        getDoc(doc(firestore, type, blogSlug)).then((val) => {
            setBlog(val.data());
        })

    }, [])


    if (isLogged != null) {
        if (!isLogged) {
            navigate("/admin")
            // console.log(555656)
        }
    }
    return (
        <div>
            {/* {console.log(blog)} */}
            {blog ? <>
                <input type="text" value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
                <button
                    onClick={() => handleSave()}
                >
                    Save
                </button>
                <div>
                    <button
                        onClick={() => setModalSet(true)}
                    >
                        Settings
                    </button>
                    <EditSetModal open={modalSet} close={() => setModalSet(false)} det={blog} />

                </div>

            </> : null}

        </div>
    )
}
