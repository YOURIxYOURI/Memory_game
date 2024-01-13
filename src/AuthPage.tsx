import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './AuthPage.css'; 

const AuthPage: React.FC = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate  = useNavigate();
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Obsługa logiki logowania 
    navigate('/game');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Obsługa logiki rejestracji 
  };

  return (
    <div className="AuthPage">
      <div className="auth-container">
        <div className="auth-form login-form">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <label>
              Username:
              <input
                className='form-input'
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
            </label>
            <label>
              Password:
              <input
                className='form-input'
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </label>
            <button className='form-button' type="submit">Login</button>
          </form>
        </div>

        <div className="auth-form register-form">
          <h2>Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            <label>
              Username:
              <input
                type="text"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </label>
            <label>
              Confirm Password:
              <input
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              />
            </label>
            <button className='form-button' type="submit">Register</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
