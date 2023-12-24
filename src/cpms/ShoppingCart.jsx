
import { useDispatch , useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { checkout } from '../store/actions/user.actions.js'
import {REMOVE_TOY_FROM_CART , CLEAR_CART } from '../store/reducers/toy.reducer.js'

export function ShoppingCart({ shoppingCart }) {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    function removeFromCart(toyId) {
        dispatch({ type: REMOVE_TOY_FROM_CART, toyId })
    }

    function getCartTotal() {
        return shoppingCart.reduce((acc, toy) => acc + toy.price, 0)
    }

    function onCheckout() {
        const amount = getCartTotal()
        dispatch({ type: CLEAR_CART })
        showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
    }

   
    const total = getCartTotal()
    return (
        <section className="cart" >
            <h3>Your Cart</h3>
            <ul>
                {
                    shoppingCart.map((toy, idx) => <li key={idx}>
                        <button className="btn" onClick={() => {
                            removeFromCart(toy._id)
                        }}>x</button>
                        {toy.name} | ${toy.price}
                    </li>)
                }
            </ul>
            <p>Total: ${total} </p>
            <button className="btn dark" disabled={!user || !total} onClick={onCheckout}>Checkout</button>
        </section>
    )
}
