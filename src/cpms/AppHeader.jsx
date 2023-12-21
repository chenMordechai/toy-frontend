import { useSelector } from 'react-redux'
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { UserMsg } from './UserMsg.jsx'
import { logout } from '../store/actions/user.actions.js'
import { Signup } from './Signup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

export function AppHeader({onToggleScreen,onCloseScreen}) {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const [isSignupOpen, setIsSignupOpen] = useState(false)

    async function onLogout() {
        console.log('onLogout')
        try {
            await logout()
            showSuccessMsg('Logout successfully')

        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot logout')
        }

    }
    function onCloseSignup() {
        setIsSignupOpen(false)
        onCloseScreen(true)
    }

    function onToggleSignupModal(isOpen){
        setIsSignupOpen(true)
        onToggleScreen(false)
    }

    return (
        <section className="app-header">
            <section className="link-container">
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/toy'}>Shop</NavLink>
                <NavLink to={'/review'}>Reviews</NavLink>
                {user && <NavLink to={'/user/' + user._id}>Profile</NavLink>}
            </section>

            {!user && <button className="btn light" onClick={() => {
                onToggleSignupModal(true)
            }}>Login/Signup</button>}


            {user && <section className="user-info">

                <span>{user.fullname}</span>
                {user.isAdmin && <span>Admin</span>}
                <button className="btn light" onClick={onLogout}>Logout </button>
            </section>}

            {isSignupOpen && <Signup onCloseSignup={onCloseSignup} />}
      
            <UserMsg />
            <button className="menu-btn" onClick={()=>onToggleScreen(true)}><span></span></button>
        </section>
    )
}