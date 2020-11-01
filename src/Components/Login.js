import React, { useState } from 'react'
import '../css/Login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
    const loginSubmit = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then((auth) => {
            if(auth) {
                history.push('/')
            }
        })
        .catch(err => alert(err.message))
    }

    const createSubmit = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            console.log(auth)
            if(auth) {
                history.push('/')
            }
        })
        .catch(err => alert(err.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img className='login_logo' src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' alt='amazon logo' />
            </Link>

            <div className='login_container'>
                <h1>Sign-In</h1>
                <div className='login_form'>
                    <form onSubmit={(e) => loginSubmit(e)}>
                        <h5>Email</h5>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' />

                        <h5>Password</h5>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' />

                        <button type='submit'>sign in</button>
                    </form>

                    <p>
                        sdnd  ldkvxkdvjsdlk vls fl ka lsfcxlkv  sdlidss iufs i.adashd cahdniauw
                    </p>
                    <button type='button' onClick={(e) => createSubmit(e)} className='login_create'>create an amazon account</button>
                </div>
            </div>
        </div>
    )
}

export default Login
