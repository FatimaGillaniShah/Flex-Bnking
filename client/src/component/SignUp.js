import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        username,
        email,
        password
      });

      if (response.status === 201) {
        navigate('/login'); 
      } else {
        console.log('Registration failed:', response.data.message);
        alert('Registration failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration. Please try again.');
    }
  }, [username, email, password, navigate]);

  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
          token: credentialResponse.credential,
        });
  
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard');
        } else {
          console.log('Google Sign-Up failed:', response.data.message);
          alert('Google Sign-Up failed: ' + response.data.message);
        }
      } else {
        console.error('Google Sign-Up failed: No credential received');
        alert('Google Sign-Up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error with Google Sign-Up:', error);
      alert('Error with Google Sign-Up. Please try again.');
    }
  }, [navigate]);

  const handleGoogleFailure = useCallback((error) => {
    console.error('Google Sign-Up failed:', error);
    alert('Google Sign-Up failed. Please try again.');
  }, []);

  const googleClientId = useMemo(() => process.env.REACT_APP_GOOGLE_CLIENT_ID, []);

  return (
    <div className="signup-container">
      <h2>Create Your Flex Bank Account</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
            placeholder="Create a password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signup-btn-container">
          <button type="submit" className="signup-btn">Sign Up</button>
        </div>
      </form>

      <div className="social-signup">
        <h3>Or sign up with</h3>
        <div className="social-icons">
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </GoogleOAuthProvider>
        </div>
      </div>

      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default SignUp;
