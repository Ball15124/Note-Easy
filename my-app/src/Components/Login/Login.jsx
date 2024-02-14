import React from 'react'
import './Login.css'
import { FaUserNinja } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export const Login = () => {
  return (
    <div className='wrapper'>
      <form action=''>
        <h1>Sign in</h1>
        <div className='input-box'>
          <FaUserNinja className='icon' />
          <input type='text' placeholder='username' required/>
          

        </div>
        <div className='input-box'>
          <RiLockPasswordFill className='icon'/>
          <input type='text' placeholder='password' required/>
          
        </div>
        <a href='#'>forgot password ?</a>
        <div className='button'>
          <button type='submit'>
            <a>Sign in</a>
          </button>
        </div>
        <div className='Create-account'>
          <a href='#'>Create account</a>
        </div>
      </form>
    </div>
  )
}
