import React from 'react'
import axios from 'axios'
import cookies from 'react-cookies';


export default function Login(props) {
    const { deployed_uri } = props
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
                console.log(res.data.token);
                cookies.save('access_token', res.data.token, { path: '/' });
                // window.location.reload();
            }
            ).catch(err => err)
    }

    const handleSubmitSignup = (e) => {
        e.preventDefault();
        const body = {
            email: e.target.email.value
        }
        axios.post(`${deployed_uri}/signup`, body, headers)
            .then(res => {
                console.log(res.data);
                cookies.save('access_token', res.data.token, { path: '/' });
                // window.location.reload();
            })
            .catch(err => err)
    }
    return (
        <div className='loginWrapper'>
            <h1>Login</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='inputWrapper'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id="email" placeholder='Enter your email' />
                </div>
                <button type='submit'>Login</button>
            </form>

            <span>OR</span>
            <p>No account ? Register here!</p>
            <form onSubmit={(e) => handleSubmitSignup(e)}>
                <div className='inputWrapper'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id="email" placeholder='Enter your email' />
                </div>
                <button type='submit'>Register</button>
            </form>

        </div>
    )
}
