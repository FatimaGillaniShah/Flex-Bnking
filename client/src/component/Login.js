import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        console.log('Login failed:', response.data.message);
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
          token: credentialResponse.credential,
        });
  
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard');
        } else {
          console.log('Login failed:', response.data.message);
          alert('Login failed: ' + response.data.message);
        }
      } else {
        console.error('Google login failed: No credential received');
        alert('Google login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error with Google login:', error);
      alert('Error with Google login. Please try again.');
    }
  };
  

  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
    alert('Google login failed. Please try again.');
  };

  const googleOAuthProvider = useMemo(() => (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </GoogleOAuthProvider>
  ), []); // Only recalculate if dependencies change, which they don't here

  return (
    <div className="login-container">
      <h2>Login to Flex Bank</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-btn-container">
          <button type="submit" className="login-btn">Login</button>
        </div>
      </form>

      <div className="social-login">
        <h3>Or login with</h3>
        <div className="social-icons">
          {googleOAuthProvider}
        </div>
      </div>

      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
