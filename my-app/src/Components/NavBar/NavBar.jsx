import { Link } from 'react-router-dom'
import { MdOutlineSearch } from "react-icons/md";
import { FaUserNinja } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { SlNotebook } from "react-icons/sl";
import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'

import './NavBar.css'
const NavBar = (props) => {
  function handleClick(event) {


  }
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    }
  }, []);

  const userSignOut = () => {
    signOut(auth).then(() => {
      navigate('/Login')
      console.log('sign out successful')
    }).catch(error => console.log(error))
  }

  return (

    <div className='Navbar'>
      <div>
        <SlNotebook className='logo' />
        <Link className='link' to='/Login'> Note Easy </Link>
      </div>

      <div className='search-box'>
        <input placeholder='Search' value={props.searchQuery}
          onChange={(e) => props.onSearch(e.target.value)}></input>
        <MdOutlineSearch className='icon' />
      </div>
      <div className='right-side'>
        <div className='sign-out'>
          {authUser ? <><button className='button-sign' onClick={userSignOut}>Sign out</button></> : <><p>Signed Out</p></>}

        </div>

        <div className='profile'>
          <FaUserNinja onClick={handleClick} />
        </div>
      </div>

    </div>

  )
}

export default NavBar