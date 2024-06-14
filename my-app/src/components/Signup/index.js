import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser, findUser } from '../../db';
import './index.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (mobile.length !== 10) {
      setError('Mobile number must be 10 digits');
      return;
    }
    if (findUser(username)) {
      setError('Username already exists');
      return;
    }
    if (username === '' || password === '') {
        setError('Fill in the details');
        return;
    }
    addUser(username, password);
    console.log('Signup successful');
    setError('');
    navigate('/login');
  };

  return (
    <div className="a-bg-container">
      <h1 className='website-heading auth-head'>ONLINE BOOK EXCHANGE</h1>
      <div className="signup-container">
        <h1 className="signup-header">Sign Up</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="input-box"
        />
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile Number"
          className="input-box"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-box"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="input-box"
        />
        <button onClick={handleSignup} className="btn">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
        <p className='aboutText'>Already have an account? <a className="hyp"href="/login"onClick={() => navigate('/login')}>Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
