import './navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='nav-container'>
                <span className='logo font-link'>Bookit</span>
                <div className="nav-items">
                    <button className="nav-button">Register</button>
                    <button className="nav-button">Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar 