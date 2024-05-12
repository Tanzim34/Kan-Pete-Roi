import "./login.scss"
import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import Font Awesome icons
// Assuming you have a separate stylesheet for login styles

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = {
        email: email,
        password: password
      };
      
      const response = await fetch('http://127.0.0.1:8000/LogIn', { // Replace with your backend login endpoint URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Assuming the backend sends back a token upon successful login
      const responseData = await response.json();
      const token = responseData.token;
      const u_id=responseData.u_id

      // You can handle the successful login here, such as storing the token in local storage and redirecting
      localStorage.setItem('token', token);
      localStorage.setItem('u_id',u_id);
      localStorage.setItem('name',responseData.name);
      localStorage.setItem('email',responseData.email);
      localStorage.setItem('log', 'in')
      // Redirect to the dashboard or any other page after successful login
      window.location.href = '/';
    } catch (error) {
      console.error('Error:', error);
      // Handle login errors (e.g., display error message to user)
      setLoginError(true);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <FaEnvelope className="icon" /> {/* Email icon */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Email"
          />
        </div>
        <div className='input-container'>
          <FaLock className="icon" /> {/* Password icon */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <div className="forgot-password">
          <a href="#">Forgot Password ?</a>
        </div>
        <div className="signup">
          <a href="#">Create account ?</a>
        </div>
        {loginError && <p className="error-message">Incorrect email or password.</p>}
      </form>
    </div>
  );
}

export default LoginPage;
