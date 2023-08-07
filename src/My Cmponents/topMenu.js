import React from 'react'
import '../css/topMenu.css'

export default function TopMenu() {
    return (
        <div className='main'>
            <div>
                <a href='/'><h1 className='title'>Todos List</h1></a>
            </div>

            <div className='right'>

                <a className='button' href='/'>
                    Home
                </a>

                <a className='button' href='/about'>
                    Home
                </a>

            </div>

        </div>
    )
}
