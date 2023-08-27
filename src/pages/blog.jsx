import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../firebase_setup/firebase'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

export default function Blog() {
    const { blogSlug } = useParams();
    const [data, setData] = useState()

    // console.log(firestore);

    const run = async () => {
        try {
            const dref = doc(firestore, 'blog', blogSlug);
            const dsnap = await getDoc(dref);

            if (dsnap.exists()) {
                setData(dsnap.data())

            } else {
                console.log(555)
            }

        } catch (error) {
            console.log(22);
            console.log(error);
        }

    }
    useEffect(() => {
        const ref = collection(firestore, 'blog')
        try {
            run();
        } catch (error) {

        }
    }, [])
    console.log(data)
    return (
        <div>
            {data ?
                <>



                </>
                : <>


                </>}
        </div>
    )
}
