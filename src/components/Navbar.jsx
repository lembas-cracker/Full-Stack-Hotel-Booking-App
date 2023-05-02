import './navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='nav-container'>
                <Link to='/' style={{color:'inherit', textDecoration:"none"}}>
                <span className='logo font-link'>Bookit</span>
                </Link>
                <div className="nav-items">
                    <button className="nav-button">Register</button>
                    <button className="nav-button">Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar 