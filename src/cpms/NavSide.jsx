import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBell, faClipboard, faComments, faGear, faCarSide } from '@fortawesome/free-solid-svg-icons'

export function NavSide() {

    return (
        <section className="nav-side">
            <div className='blue'>
                <FontAwesomeIcon icon={faCartShopping} />
            </div>
            <div className='blue'>
                <FontAwesomeIcon icon={faBell} />
            </div>
            <div>
                <FontAwesomeIcon icon={faClipboard} />
            </div>
            <div>
                <FontAwesomeIcon icon={faComments} />
            </div>
            <div>
                <FontAwesomeIcon icon={faCarSide} />
            </div>
            <div>
                <FontAwesomeIcon icon={faGear} />
            </div>
        </section>
    )
}