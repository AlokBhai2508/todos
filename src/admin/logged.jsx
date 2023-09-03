import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, firestore } from '../firebase_setup/firebase';
import { collection, deleteDoc, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';
import "./dashboard.css";
import { Link, useNavigate } from 'react-router-dom';
import NewModal from '../My Cmponents/newModal';

export default function Logged() {
    const navigate = useNavigate();
    const del = (id, pos) => {
        let ref = doc(firestore, pos, id)
        deleteDoc(ref)
        setChanges(changes + 1)
    }
    const handlePublish = (id) => {
        getDoc(doc(firestore, "drafts", id)).then((val) => {
            setDoc(doc(firestore, "blog", id), {
                ...val.data(),
            })
        }).then(() => {
            deleteDoc(doc(firestore, "drafts", id)).then(() => {
                setChanges(changes + 1)
            })
        })
    }
    const newBlog = () => {
        navigate("/admin/new")
    }
    const [blogs, setBlogs] = useState();
    const [drafts, setDrafts] = useState();
    const [changes, setChanges] = useState(0);
    const [oModal, setOModal] = useState(false);
    useEffect(() => {
        const ref = getDocs(collection(firestore, "blog")).then((e) => {
            const newData = e.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            setBlogs(newData);

        });
    }, [changes])
    useEffect(() => {
        console.log(12)
        const ref = getDocs(collection(firestore, "drafts")).then((e) => {
            const newData = e.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            setDrafts(newData);

        });
    }, [changes])

    return (

        <div>

            <div id="blog-dash">
            <div className="main-container">
                <h1>Blogs</h1>
                <button
                    id='add'
                        onClick={() => setOModal(true)}
                >Add New</button>
                    <NewModal open={oModal} close={() => { setOModal(false) }} />
                <div className="blog-cont-main">
                    <div className="blog-cont">
                        <h3 className="content header">Title</h3>
                        <h3 className="content header">Slug</h3>
                        <h3 className="content header">Action</h3>
                    </div>

                        {blogs ? blogs.map(blog => (
                            <div className='blog-cont'>
                                <h4 className='content'>{blog.title}</h4>
                                <h4 className='content'>{blog.slug}</h4>
                                <div className="content action">
                                    <Link className='edit'
                                        to={"/edit/" + blog.slug}
                                    >Edit</Link>
                                    <button className='delete'
                                        onClick={() => del(blog.id, 'blog')}
                                    >Delete</button>
                                </div>

                            </div>
                        ))
                            : null}


                    </div>
                </div>




                <div id="draft">
                    <h1>Drafts</h1>
                    <div className="blog-cont-main">
                        <div className="blog-cont">
                            <h3 className="content header">Title</h3>
                            <h3 className="content header">Slug</h3>
                            <h3 className="content header">Action</h3>
                        </div>

                        {drafts ? drafts.map(draft => (
                            <div className='blog-cont'>
                                <h4 className='content'>{draft.title}</h4>
                                <h4 className='content'>{draft.slug}</h4>
                                <div className="content action">
                                    <Link className='edit'
                                        to={"/edit/" + draft.slug}
                                    >Edit</Link>
                                    <button className='delete'
                                        onClick={() => del(draft.id, 'drafts')}
                                    >Delete</button>
                                    <button className='publish'
                                        onClick={() => handlePublish(draft.id)}
                                    >Publish</button>
                                </div>

                            </div>
                        ))
                            : null}
                    </div>
                </div>
            </div>





            <button
                id='out'
                onClick={() => { signOut(auth).then(() => { console.log("logged out") }) }}
            >Log Out</button>
        </div>
    )
}
