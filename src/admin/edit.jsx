import React, { useEffect, useState, useRef } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, firestore } from '../firebase_setup/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import EditSetModal from '../My Cmponents/editSetModal';
import { Editor } from '@tinymce/tinymce-react';

export default function Edit() {
    const navigate = useNavigate();
    const [isLogged, setIsLoged] = useState(null)
    const [blog, setBlog] = useState();
    const [modalSet, setModalSet] = useState(false);
    const { blogSlug, type } = useParams()


    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const handleSave = () => {
        console.log(blog)
        setDoc(doc(firestore, type, blogSlug), { ...blog, body: editorRef.current.getContent() })
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
                    <EditSetModal open={modalSet} close={() => setModalSet(false)} det={blog} type={type} />

                </div>
                <div>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={blog.body}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat ' +
                                'font',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:20px }'
                        }}
                    />
                    <button onClick={log}>Log editor content</button>

                </div>

            </> : null}

        </div>
    )
}
