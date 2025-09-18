import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import apiRequest from "../../lib/apiReques.js";

const Register = () => {
  const [error, setError] = useState(null);
  const[isLoading,setIsLoding] = useState(false);
  const navigate = useNavigate(); // to redirect after successful registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoding(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await apiRequest.post(
        "/auth/register",
        { username, email, password },
        {
          withCredentials: true, 
        }
      );
      setIsLoding(false);
      navigate("/login"); 
    } catch (err) {
      console.error("Register error:", err);
      setIsLoding(false);
      setError(
        err.response?.data?.message || "Something went wrong during registration"
      );
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input type="text" name="username" placeholder="Username" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button  disabled={isLoading} type="submit">Register</button>
          <Link to="/login">Do you have an account?</Link>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="background" />
      </div>
    </div>
  );
};

export default Register;
