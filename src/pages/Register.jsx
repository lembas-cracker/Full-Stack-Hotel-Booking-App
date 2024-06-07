import React, { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "AUTH_START" });
    try {
      const res = await axios.post(API_BASE_URL + "/auth/register", credentials);
      dispatch({ type: "AUTH_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleClick} className="login-container">
        <input type="text" className="login-input" id="username" placeholder="Username" onChange={handleChange} />
        <input type="text" className="login-input" id="email" placeholder="Email" onChange={handleChange} />
        <input type="password" className="login-input" id="password" placeholder="Password" onChange={handleChange} />
        <button disabled={loading} className="login-button" type="submit">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </form>
    </div>
  );
};

export default Register;
