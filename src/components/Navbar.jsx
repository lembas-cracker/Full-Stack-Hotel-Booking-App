import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo font-link">Bookit</span>
        </Link>
        {currentUser ? (
          currentUser.username
        ) : (
          <div className="nav-items">
            <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
              <button className="nav-button">Register</button>
            </Link>
            <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
              <button className="nav-button">Sign in</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
