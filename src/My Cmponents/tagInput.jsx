import React, { useEffect, useState } from 'react'
import "../css/editSetModal.css"

const TagInput = ({ tag, onChange }) => {
    const [arr, setArr] = useState(tag);
    const [inp, setInput] = useState('');
    const [change, setChange] = useState(0);
    useEffect(() => onChange(arr), [arr])
    return (
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
            {/* </div> */}
        </div>
    )
}

export default TagInput
