import { collection, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase_setup/firebase';
import { Link } from "react-router-dom";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        let _new;
        getDocs(collection(firestore, 'blog')).then((querySnapshot) => {
            const newData = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            setBlogs(newData);

        })

        // console.log(_new)
    }, [])
    console.log(blogs)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', color: 'black' }}>

            {blogs && blogs.map((blog) => <>
                <Link to={'/blog/' + blog.id}>
                    <div className="blog" style={{ backgroundColor: 'rgb(150, 100, 120)', margin: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', height: '30px' }}>
                        <h3>{blog.id}</h3>
                        <div dangerouslySetInnerHTML={{ __html: blog.body }} style={{ overflow: 'hidden' }}></div>
                    </div>
                </Link>
            </>)}
        </div>
    )
}
