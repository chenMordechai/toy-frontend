import TextField from '@mui/material/TextField';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { login, signup } from '../store/actions/user.actions.js'

import { useState, useEffect } from 'react'

function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'chen',
        password: '123',
    }
}

export function LoginSignup({ onSetUser, onCloseSignup }) {

    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    async function onSubmit(ev) {
        onCloseSignup()
        ev.preventDefault()

        if (isSignupState) {
            try {
                const user = await signup(credentials)
                showSuccessMsg(`Welcome ${user.fullname}`)
            } catch (err) {
                showErrorMsg('Cannot signup')
            }
        } else {
            try {
                const user = await login(credentials)
                showSuccessMsg(`Hi again ${user.fullname}`)
            } catch (err) {
                showErrorMsg('Cannot login')
            }

        }
    }

    function onToggleSignupState() {
        setIsSignupState(isSignupState => !isSignupState)
    }

    const { username, password, fullname } = credentials

    return (
        <div className="login-page">

            <form className="login-form" onSubmit={onSubmit}>
                <TextField id="outlined-basic" label="User Name" variant="outlined" onChange={handleCredentialsChange} value={username} name="username" type="text" />

                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={handleCredentialsChange} value={password} name="password" type="text" />

                {isSignupState && <TextField id="outlined-basic" label="Full Name" variant="outlined" onChange={handleCredentialsChange} value={fullname} name="fullname" type="text" />}

                <button className="btn dark" >{isSignupState ? 'Signup' : 'Login'}</button>
                <a href="#" onClick={onToggleSignupState}>
                    {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
                </a >
            </form>

        </div >
    )
}

