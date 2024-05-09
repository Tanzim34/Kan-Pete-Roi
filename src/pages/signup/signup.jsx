import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import "./signup.scss"

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[name,setname]=useState('')
  const [confirmPassword, setConfirmPassword] = useState('');

  //const[create_user,setuser]=useState(false)

  const[paas_match,setmatch]=useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handlename=(e)=>{
    setname(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('adada')
    let alu=false
    if(password!==confirmPassword){
      setmatch(true)
      
    }
    else{
      setmatch(false)
      alu=true
    }
    if(alu===true){
      
      try {
        const data1={
          email: email,
          password: password,
          name: name
        }
        const response = await fetch('http://127.0.0.1:8000/Create_user', {
          method: 'POST',
          headers : {'Content-Type': 'application/json'
        },
          body : JSON.stringify(data1)
        })
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Success:', data);
        // Handle successful signup (e.g., redirect to login page)
        if (data.token) {
          localStorage.setItem('token', data.token); // Replace 'auth_token' with your desired key
          localStorage.setItem('name',data.name);
          localStorage.setItem('u_id',data.u_id);
        } else {
          console.warn('No token received in response');
        }


        window.location.href = '/';
        // Handle successful signup (e.g., redirect to login page)
      } catch (error) {
        console.error('Error:', error);
        // Handle signup errors (e.g., display error message to user)
      }
    }
  };

  return (
    <div className='signup-container'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className='email-field'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className='name'>
          <label htmlFor="email">User Name:</label>
          <input
            id="name"
            value={name}
            onChange={handlename}
            required
          />
        </div>
        <div className='pass-field'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className='re-pass-field'>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button type='submit'>
          Sign Up
        </button>
      </form>
      {
        paas_match&&<div className='pass-warr'>
        
          <p>
            wrong password
          </p>

        </div>
      }
    </div>
  );
}

export default SignUpPage;
