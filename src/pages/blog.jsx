import React, { useEffect, useState } from 'react'
import { redirect, useParams } from 'react-router-dom'
import { firestore } from '../firebase_setup/firebase'
import { collection, doc, getDoc, } from 'firebase/firestore'

export default function Blog() {

    const { blogSlug } = useParams();
    const [data, setData] = useState()
    const [exist, setExist] = useState(true)

    const run = async () => {
        try {
            const dref = doc(firestore, 'blog', blogSlug);
            const dsnap = await getDoc(dref);

            if (dsnap.exists()) {
                setData(dsnap.data())

            } else {
                setExist(false);
            }

        } catch (error) {
            console.log(22);
            console.log(error);
        }

    }
    useEffect(() => {

        try {
            run();
        } catch (error) {

        }
    }, [])
    console.log(data)
    return (
        <div>
            {exist ? <>
                {data ?
                    <div style={{ marginLeft: "50px", marginRight: "50px", wordWrap: "break-word" }}>
                        <h1>{data.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: data.body }} style={{ marginTop: 10 }}></div>
                    </div>
                : <>


                    </>}</> :
                <div>
                    <h1>Blog Not Found Error 404!</h1>
                </div>}

        </div>
    )
}
