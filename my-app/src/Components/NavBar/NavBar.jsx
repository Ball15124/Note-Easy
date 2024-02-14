import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineSearch } from "react-icons/md";
import { FaUserNinja } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import './NavBar.css'
const NavBar = () => {
    const navigate = useNavigate();
    function handleClick(event) {

    navigate('/Register');
    }
  return (
    <div className='Navbar'>
        <Link className='link' to='/Login'> Note Easy </Link>
        <div className='search-box'>
            <input placeholder='Search'></input>
            <MdOutlineSearch className='icon'/>
        </div>
        <div className='profile'>
            <FaUserNinja onClick={handleClick}/>
        </div>
    </div>
  )
}

export default NavBar