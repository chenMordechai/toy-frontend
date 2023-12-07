import { useSelector, useDispatch } from 'react-redux'


import { LoginSignup } from "../cpms/LoginSignup.jsx";
import { SET_USER } from '../store/reducers/user.reducer.js'
import { logout } from '../store/actions/user.actions.js'


export function Signup({ onCloseSignup }) {

    const dispatch = useDispatch()
    // get from storeState
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
    }

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

    return (
        <section className="signup">
            <h2>Signup</h2>
            {user && <section className="user-info">
                <h3>Hello {user.fullname}</h3>
                <button onClick={onLogout}>Logout</button>
            </section>}

            {!user && <section className="user-info">
                <LoginSignup onSetUser={onSetUser} onCloseSignup={onCloseSignup} />
            </section>}
        </section>
    )
}