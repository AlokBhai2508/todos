import React, { useState } from 'react'
import '../css/topMenu.css'
import { Link } from "react-router-dom";

export default function TopMenu() {
    const [menu, setMenu] = useState(false);

    return (<>
        <div className={menu ? "main open" : "main"}>
            <div>
                <Link to='/'><h1 className='title'>Blog</h1></Link>
            </div>

            <div className='right'>
                <button className='side'
                    onClick={() => { setMenu(!menu) }}
                ><div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div></button>


                <Link className='button' to='/'>
                    Home
                </Link>

                <Link className='button' to='/about'>
                    About
                </Link>



            </div>

        </div>


    </>
    )
}
