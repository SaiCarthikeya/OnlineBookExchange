import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUser } from '../..//db';
import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = () => {
    // Your login logic here
    // Check username and password
    const user = findUser(username);
    if (username === '' || password === '') {
        setError('Fill in the details');
        return;
    } 
    if (user && user.password === password) {
        // Set isAuthenticated to true
        localStorage.setItem('isAuthenticated', true);
        // Redirect to home page
        navigate('/')
    } else {
        // Display error message
        setError('Invalid username or password');
    }
};
  return (
    <div className="a-bg-container">
      <h1 className='website-heading auth-head'>ONLINE BOOK EXCHANGE</h1>
      <div className="login-container">
        <h1 className="login-header">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="input-box"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-box"
        />
        <button onClick={handleLogin} className="btn">Login</button>
        {error && <p className="error-message">{error}</p>}
        <p className='aboutText'>Don't have an account? <a className="hyp"href="/signup"onClick={() => navigate('/signup')}>Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;
