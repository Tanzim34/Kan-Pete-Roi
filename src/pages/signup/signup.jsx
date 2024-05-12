import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import "./signup.scss"

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatch(true);
      return;
    } else {
      setPasswordMatch(false);
    }

    try {
      const data1 = {
        email: email,
        password: password,
        name: name
      };

      const response = await fetch('http://127.0.0.1:8000/Create_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data1)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('u_id', data.u_id);
        localStorage.setItem('email', data.email);
        localStorage.setItem('log', 'in')
      } else {
        console.warn('No token received in response');
      }

      window.location.href = '/';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='signup-container'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
      <div className='email-field'>
  <label htmlFor="email">Email:</label>
  <div className="input-container">
    <FontAwesomeIcon icon={faEnvelope} className="icon" />
    <input
      type="email"
      id="email"
      value={email}
      onChange={handleEmailChange}
      required
    />
  </div>
</div>
<div className='username'>
  <label htmlFor="username">User Name:</label>
  <div className="input-container">
    <FontAwesomeIcon icon={faUser} className="icon" />
    <input
      id="username"
      value={name}
      onChange={handleNameChange}
      required
    />
  </div>
</div>
<div className='pass-field'>
  <label htmlFor="password">Password:</label>
  <div className="input-container">
    <FontAwesomeIcon icon={faLock} className="icon" />
    <input
      type="password"
      id="password"
      value={password}
      onChange={handlePasswordChange}
      required
    />
  </div>
</div>
<div className='re-pass-field'>
  <label htmlFor="confirmPassword">Confirm Password:</label>
  <div className="input-container">
    <FontAwesomeIcon icon={faLock} className="icon" />
    <input
      type="password"
      id="confirmPassword"
      value={confirmPassword}
      onChange={handleConfirmPasswordChange}
      required
    />
  </div>
</div>
        <button type='submit'>
          Sign Up
        </button>
      </form>
      {passwordMatch && (
        <div className='pass-warr'>
          <p>Wrong password</p>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
