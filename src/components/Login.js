import React, { useState } from 'react'
import axios from 'axios'
import cookies from 'react-cookies';


export default function Login(props) {
    const { deployed_uri } = props
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const [signupErrorMessage, setSignupErrorMessage] = useState('')

    const headers = {
        'Content-Type': 'application/json',
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: e.target.email.value
        }
        axios.post(`${deployed_uri}/login`, body, headers)
            .then(res => {
                cookies.save('access_token', res.data.token, { path: '/' });
            }
            ).catch(err => setLoginErrorMessage('User not found'))
    }

    const handleSubmitSignup = (e) => {
        e.preventDefault();
        const body = {
            email: e.target.email.value
        }
        axios.post(`${deployed_uri}/signup`, body, headers)
            .then(res => {
                cookies.save('access_token', res.data.token, { path: '/' });
            })
            .catch(err => setSignupErrorMessage('Email already exists'))
    }
    return (
        <div className='loginWrapper'>
            <h1>Login</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='inputWrapper'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id="email" placeholder='Enter your email' />
                    {loginErrorMessage !== '' ? <p style={{ fontSize: '10px', color: 'red' }}>{loginErrorMessage}</p> : ''}
                </div>
                <button type='submit'>Login</button>
            </form>

            <span>OR</span>
            <p>No account ? Register here!</p>
            <form onSubmit={(e) => handleSubmitSignup(e)}>
                <div className='inputWrapper'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id="email" placeholder='Enter your email' />
                    {signupErrorMessage !== '' ? <p style={{ fontSize: '10px', color: 'red' }}>{signupErrorMessage}</p> : ''}

                </div>
                <button type='submit'>Register</button>
            </form>

        </div>
    )
}
