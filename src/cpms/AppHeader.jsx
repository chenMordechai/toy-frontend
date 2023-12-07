import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";
import { UserMsg } from './UserMsg.jsx'
import { logout } from '../store/actions/user.actions.js'
import { Signup } from './Signup.jsx'
import { useState } from 'react';

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const [isSignupOpen, setIsSignupOpen] = useState(false)

    async function onLogout() {
        // move to a function and use dispatch
        try {
            await logout()
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
            {/* <section className="link-container"> */}
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/toy'}>Shop</NavLink>
            <NavLink to={'/review'}>Reviews</NavLink>
            {/* {!user && <NavLink to={'/signup'}>Login/Signup</NavLink>} */}
            {!user && <button onClick={() => {
                setIsSignupOpen(true)
            }}>Login/Signup</button>}

            {/* <NavLink to={'/about'}>About</NavLink> */}
            {/* <NavLink to={'/blog'}>Blog</NavLink> */}

            {user && <section className="user-info">
                <NavLink to={'/user/' + user._id}>Profile</NavLink>
                {/* <NavLink to={'/signup'}>Logout</NavLink> */}
                <span>{user.fullname}</span>
                {user.isAdmin && <span>Admin</span>}
                <button onClick={onLogout}>Logout</button>
            </section>}
            {isSignupOpen && <Signup onCloseSignup={onCloseSignup} />}
            <UserMsg />
        </section>
    )
}