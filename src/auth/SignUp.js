import React, { useState } from 'react';
import axiosInstance from '../config/axiosInstance';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);  // Clear previous errors
 
      try {
        const response = await axiosInstance.post('/auth/signup', { name, email, password });
        console.log('Signup successful', response.data);
        window.location.href = '/login';  // Redirect to login
      } catch (error) {
        console.log(error);
        
        // Check if the error has a response from the server
        if (error.response && error.response.data && error.response.data.message) {
          // Set the error to the message from the backend
          setError(error.response.data.message);
        } else {
          // Fallback error message if no message is found
          setError('Signup failed. Please try again.');
        }
      }
    };
    

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
