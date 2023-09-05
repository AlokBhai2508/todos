import React, { useEffect, useState } from 'react'
import "../css/editSetModal.css"

export default function EditSetModal({ open, close, det }) {
    const [arr, setArr] = useState([]);
    const [inp, setInput] = useState('');
    const [change, setChange] = useState(0);
    const handleSave = () => {

    }
    useEffect(() => {
        setArr(det.tags)
    }, [])
    if (!open) return null;
    return (
        <div className="modal-main">
            <div className="box">
                <div className="top">
                    <h1>Settings</h1>
                    <button
                        onClick={close}
                    ><h1>X</h1></button>

                </div>
                <div className="modal-content-corner">
                    <div>
                        <div className="tag-div">
                            {arr.map((e, i) => <span className='tag'>{e}
                                <button className='cancel'
                                    onClick={() => {
                                        let a = arr.splice(i, 1)
                                        console.log(arr)
                                        setChange(change + 1)
                                        // setArr()

                                    }}
                                >x</button>
                            </span>)}
                        </div>

                        <input className="inn" type="text" onChange={(e) => setInput(e.target.value)} value={inp} onKeyUp={(key) => {
                            if ((key.code === "NumpadEnter" || key.code === "Enter") && inp !== "") {
                                setArr([...arr, inp]);
                                setInput('')
                            }
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
