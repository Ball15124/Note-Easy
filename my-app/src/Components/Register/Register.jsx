import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import { MdEmail } from "react-icons/md";
import { FaUserNinja } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'



export const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    if (password != repeatPass) {
      alert("Passwords do not match")
    } else {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        console.log(userCredential);
        navigate('/Login')
      })
        .catch((error) => {
          console.log(error);
        })
    }
  }
  return (
    <div className='RegisterPage'>
      <div className='wrapper'>
        <form onSubmit={signUp}>
          <h1>Register</h1>
          <div className='input-box'>
            <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <MdEmail className='icon' />
          </div>
          <div className='input-box'>
            <RiLockPasswordFill className='icon' />
            <input type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className='input-box'>
            <RiLockPasswordFill className='icon' />
            <input type='text' placeholder='Repeat Password' onChange={(e) => setRepeatPass(e.target.value)} required />
          </div>
          <div className='button-sign'>
            <button type='submit'>
              Create Account
            </button>
          </div>
          <div className='already'>
            <a>Already have account ? </a><Link className='sign'to='/Login'>Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
