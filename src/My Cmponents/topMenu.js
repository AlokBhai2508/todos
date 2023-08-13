import React, { useState } from 'react'
import '../css/topMenu.css'

export default function TopMenu() {
    const [menu, setMenu] = useState(true);

    return (<>
        <div className={menu ? "main open" : "main"}>
            <div>
                <a href='/'><h1 className='title'>Blog</h1></a>
            </div>

            <div className='right'>
                <button className='side'
                    onClick={() => { setMenu(!menu) }}
                >O</button>

                <a className='button' href='/'>
                    Home
                </a>

                <a className='button' href='/about'>
                    About
                </a>



            </div>

        </div>


    </>
    )
}
