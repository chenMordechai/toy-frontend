import {useDispatch, useSelector} from 'react-redux'
import { useState,useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { logout } from '../store/actions/user.actions.js'
import { Signup } from './Signup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { SET_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export function AppHeader({isScreenOpen,onOpenScreen,onCloseScreen}) {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const [isSignupOpen, setIsSignupOpen] = useState(false)
    const [isLinksOpen, setIsLinksOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)

    const dispatch = useDispatch()
    const shoppingCart = useSelector(storeState => storeState.toyModule.shoppingCart)
   
    useEffect(()=>{
        if(isSignupOpen ||isLinksOpen|| isCartOpen ){
            onOpenScreen()
        }else{
            onCloseScreen()
        }

    },[isSignupOpen,isLinksOpen,isCartOpen])

    useEffect(()=>{
        if(!isScreenOpen ){
            setIsSignupOpen(false)
            setIsLinksOpen(false)
            setIsCartOpen(false)
        }

    },[isScreenOpen])

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

    return (
        <section className={`app-header ${isCartOpen?'cart-open':''} ${isSignupOpen?'signup-open':''} ${isLinksOpen?'links-open':''}`}>
            <section className="link-container">
                <NavLink to={'/'} onClick={()=>onCloseScreen(true)}>Home</NavLink>
                <NavLink to={'/toy'} onClick={()=>onCloseScreen(true)}>Shop</NavLink>
                <NavLink to={'/review'} onClick={()=>onCloseScreen(true)}>Reviews</NavLink>
                {user && <NavLink to={'/user/' + user._id} onClick={()=>onCloseScreen(true)}>Profile</NavLink>}
            </section>

            {!user && <button className="btn light" onClick={() => {
                setIsSignupOpen(prev=>!prev)
            }}>Login/Signup</button>}


            {user && <section className="user-info">
                {user.isAdmin && <span>Admin</span>}
                <span>{user.fullname}</span>
                <a href="#" onClick={()=>setIsCartOpen(prev=>!prev)}>
                <FontAwesomeIcon icon={faCartShopping} />
                </a>
                <button className="btn light" onClick={onLogout}>Logout </button>
            </section>}
            

            {isSignupOpen && <Signup onCloseSignup={onCloseSignup} />}
            <ShoppingCart shoppingCart={shoppingCart} />
            <UserMsg />
            <button className="menu-btn" onClick={()=>setIsLinksOpen(prev=>!prev)}><span></span></button>
        </section>
    )
}