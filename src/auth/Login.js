import React, { useState } from 'react';
import axiosInstance from '../config/axiosInstance'; // Use the Axios instance

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);  // Clear error before login attempt
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      console.log('Login successful', response.data);
      localStorage.setItem('token', response.data.token);  // Store token
      window.location.href = '/userDashboard';  // Redirect to dashboard
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
