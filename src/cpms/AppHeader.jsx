import { NavLink } from "react-router-dom";
import { UserMsg } from './UserMsg.jsx'


export function AppHeader() {
    {/* <Link to={`/toy/edit/${toy._id}`}>Edit</Link> */ }
    return (
        <section className="app-header">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/toy'}>Toys</NavLink>
            <UserMsg />
        </section>
    )
}