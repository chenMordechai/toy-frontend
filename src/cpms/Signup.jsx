import { useSelector, useDispatch } from 'react-redux'
import { LoginSignup } from "../cpms/LoginSignup.jsx";
import { SET_USER } from '../store/reducers/user.reducer.js'
import { logout } from '../store/actions/user.actions.js'

export function Signup({ onCloseSignup }) {

    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
    }

    return (
        <section className="signup">
            <button className="btn" onClick={onCloseSignup}>x</button>
            <h2>Signup</h2>

            {!user && <section className="user-info">
                <LoginSignup onSetUser={onSetUser} onCloseSignup={onCloseSignup} />
            </section>}
        </section>
    )
}