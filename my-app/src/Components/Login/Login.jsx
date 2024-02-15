import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './Login.css'
import { FaUserNinja } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log(userCredential);
      navigate('/home')
    })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <div className='LoginPage'>
      <div className='wrapper'>
        <form onSubmit={signIn}>
          <h1>Sign In</h1>
          <div className='input-box'>
            <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <FaUserNinja className='icon' />
          </div>
          <div className='input-box'>
            <input type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <RiLockPasswordFill className='icon' />
          </div>
          <div className='forget'>
            <a href='#'>forgot password ?</a>
          </div>
          <div className='button-sign'>
            <button type='submit'>
              SIGN IN
            </button>
          </div>
          <div className='Create-account'>
            <Link to='/Register'>Create Account</Link>
          </div>

        </form>
      </div>
    </div>
  )
}
