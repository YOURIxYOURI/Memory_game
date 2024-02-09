import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css'; 

const AuthPage: React.FC = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', confirmPassword: '' });
  const [errorReg, setErrorReg] = useState<string | null>(null);
  const [errorLog, setErrorLog] = useState<string | null>(null);
  const navigate  = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData)
    if(parsedUserData.password == loginData.password && parsedUserData.username == loginData.username)
    {
      localStorage.setItem('loggedUser', loginData.username);
      navigate('/game');
    }else{
      setErrorLog('Incorrect username or password')
    }}else{
      setErrorLog('User not found')
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setErrorReg('Passwords do not match');
      return;
    }else{
      const user = {
        username: registerData.username,
        password: registerData.password
      }
      localStorage.setItem('user', JSON.stringify(user));
      setErrorReg('Succesfull register')
    }
  }
  return (
    <div className="AuthPage">
       <h1>Memory Game</h1>
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
            {errorLog && <p className="error-message">{errorLog}</p>}
          </form>
        </div>

        <div className="auth-form register-form">
          <h2>Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            <label>
              Username:
              <input
              className='form-input'
                type="text"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
            </label>
            <label>
              Password:
              <input
              className='form-input'
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </label>
            <label>
              Confirm Password:
              <input
              className='form-input'
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              />
            </label>
            <button className='form-button' type="submit">Register</button>
            {errorReg && <p className="error-message">{errorReg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
