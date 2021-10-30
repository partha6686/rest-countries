import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons'

function NavBar(){
    return(
        <div className='nav-bar'>
            <h1>Where in the world?</h1>    
            <a href="/" ><FontAwesomeIcon icon={faMoon} /> Dark Mode</a>
        </div>
    )
}
export default NavBar;