import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { NavLink , redirect , Link } from "react-router-dom";
import { UserMsg } from './UserMsg.jsx'
import { logout } from '../store/actions/user.actions.js'
import { Signup } from './Signup.jsx'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const [isSignupOpen, setIsSignupOpen] = useState(false)

    async function onLogout() {
        console.log('onLogout')
        // move to a function and use dispatch
        try {
            await logout()
            // console.log('hi', redirect)
            redirect('/')
            // showSuccessMsg('Logout successfully')

        } catch (err) {
            console.log('err:', err)
            // showErrorMsg('Cannot logout')
        }

    }
    function onCloseSignup() {
        setIsSignupOpen(false)
    }
    {/* <Link to={`/toy/edit/${toy._id}`}>Edit</Link> */ }
    return (
        <section className="app-header">
            <section className="link-container">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/toy'}>Shop</NavLink>
            <NavLink to={'/review'}>Reviews</NavLink>
            {user && <NavLink to={'/user/' + user._id}>Profile</NavLink>}
            </section>

            {!user && <button  className="btn light" onClick={() => {
                setIsSignupOpen(true)
            }}>Login/Signup</button>}

            <UserMsg />

            {user && <section className="user-info">
                
                <span>{user.fullname}</span>
                {user.isAdmin && <span>Admin</span>}
                <button className="btn light" onClick={onLogout}> <Link to="/">Logout</Link></button>
            </section>}
            {isSignupOpen && <Signup onCloseSignup={onCloseSignup} />}
        </section>
    )
}