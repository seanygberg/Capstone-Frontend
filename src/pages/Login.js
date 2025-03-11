import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setError(data.error || 'Failed to log in');
          return;
        }
  
        // Store the token
        localStorage.setItem('token', data.token);
        navigate('/'); // Redirect to Home page
      } catch (err) {
        setError('Error logging in: ' + err);
      }
    };
  return (
    <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
    </form>
    )
};

export default Login;