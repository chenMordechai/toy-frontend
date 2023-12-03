import { NavLink } from "react-router-dom";
import { UserMsg } from './UserMsg.jsx'


export function AppHeader() {
    {/* <Link to={`/toy/edit/${toy._id}`}>Edit</Link> */ }
    return (
        <section className="app-header">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/toy'}>Shop</NavLink>
            <NavLink to={'/signup'}>Signup</NavLink>

            {/* <NavLink to={'/about'}>About</NavLink> */}
            {/* <NavLink to={'/blog'}>Blog</NavLink> */}
            <UserMsg />
        </section>
    )
}