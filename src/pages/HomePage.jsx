import { Link } from 'react-router-dom'
import logoUrl from '../assets/img/logo.png'

export function HomePage() {
    return (
        <section className="home-page">

            <div>
                <h3>Find your best Toys for yor Children</h3>
                <Link className="btn dark" to="/toy">Get Start</Link>
            </div>
            <img src={logoUrl} />

        </section>
    )
}