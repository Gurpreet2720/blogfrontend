import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { AuthContext } from '../context/authContext';

function Login() {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      localStorage.setItem('isLoggedin', true);
      navigate('/');
    } catch (error) {
      setErr(error.response.data);
    }
  };
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleClick}>
          Login
        </button>
        {err && <p>{err}</p>}
        <span>
          Don&apos;t you have any account?
          <Link to="/register">register</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
