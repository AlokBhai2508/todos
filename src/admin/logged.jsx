import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, firestore } from '../firebase_setup/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import "./dashboard.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Logged() {
    const navigate = useNavigate();
    const del = (id) => {
        let ref = doc(firestore, 'blog', id)
        deleteDoc(ref)
        setChanges(changes + 1)
    }
    const newBlog = () => {
        navigate("/admin/new")
    }
    const [blogs, setBlogs] = useState();
    const [changes, setChanges] = useState(0);
    useEffect(() => {
        const ref = getDocs(collection(firestore, "blog")).then((e) => {
            const newData = e.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            setBlogs(newData);

        });
    }, [changes])

    return (
        <div>
            {console.log(blogs)}
            <div className="main-container">
                <h1>Blogs</h1>
                <button
                    id='add'
                    onClick={() => newBlog()}
                >Add New</button>
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
                                    onClick={() => del(blog.id)}
                                >Delete</button>
                            </div>

                        </div>
                    ))
                        : null}

                </div>
            </div>





            <button
                id='out'
                onClick={() => { signOut(auth).then(() => { console.log("logged out") }) }}
            >Log Out</button>
        </div>
    )
}
