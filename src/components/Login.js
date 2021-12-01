import React from 'react'
import axios from 'axios'
import cookies from 'react-cookies';


export default function Login() {
    const headers = {
        'Content-Type': 'application/json',
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: e.target.email.value
        }
        axios.post('http://localhost:8888/login', body, headers).
            then(res => {
                console.log(res.data);
                cookies.save('access_token', res.data.token, { path: '/' });
                window.location.reload();
            }
            ).catch(err => err)
    }
    const handleSubmitSignup = (e) => {
        e.preventDefault();
        const body = {
            email: e.target.email.value
        }
        axios.post('http://localhost:8888/signup', body, headers).then(res => cookies.set('access_token', res.data)
        ).catch(err => err)
    }
    return (
        <div className='loginWrapper'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='inputWrapper'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id="email" placeholder='Enter your email' />
                </div>
                <button type='submit'>Login</button>
            </form>
            <span>OR</span>
            <p>No account ? Register here!</p>
            <form onSubmit={handleSubmitSignup}>
                <div className='inputWrapper'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id="email" placeholder='Enter your email' />
                </div>
                <button type='submit'>Register</button>
            </form>

        </div>
    )
}
