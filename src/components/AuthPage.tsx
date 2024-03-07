import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importowanie hooka do nawigacji
import '../styles/AuthPage.css'; // Importowanie pliku stylów CSS

const AuthPage: React.FC = () => {
  // Stany dla danych logowania i rejestracji oraz błędów
  const [loginData, setLoginData] = useState({ username: '', password: '' }); // Dane logowania
  const [registerData, setRegisterData] = useState({ username: '', password: '', confirmPassword: '' }); // Dane rejestracji
  const [errorReg, setErrorReg] = useState<string | null>(null); // Błąd rejestracji
  const [errorLog, setErrorLog] = useState<string | null>(null); // Błąd logowania
  const navigate = useNavigate(); // Hook do nawigacji


  const handleLoginSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    const userData = localStorage.getItem('user');

    if (userData) {

      const parsedUserData = JSON.parse(userData);

      if (parsedUserData.password === loginData.password && parsedUserData.username === loginData.username) {

        localStorage.setItem('loggedUser', loginData.username); // Zapisanie zalogowanego użytkownika w localStorage

        navigate('/game'); // Przekierowanie do strony gry po poprawnym zalogowaniu

      } else {

        setErrorLog('Incorrect username or password'); // Ustawienie błędnego komunikatu w przypadku niepoprawnych danych logowania

      }

    } else {

      setErrorLog('User not found'); // Ustawienie błędnego komunikatu w przypadku braku użytkownika

    }

  };



  // Obsługa rejestracji

  const handleRegisterSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) { // Sprawdzenie, czy hasła zgadzają się

      setErrorReg('Passwords do not match'); // Ustawienie błędu w przypadku niezgodności haseł

      return;

    } else {

      const user = {

        username: registerData.username,

        password: registerData.password 

      };

      localStorage.setItem('user', JSON.stringify(user)); // Zapisanie danych użytkownika w localStorage po poprawnej rejestracji

      setErrorReg('Successful register'); // Ustawienie komunikatu o poprawnej rejestracji

    }

  };

  // Renderowanie komponentu
  return (
    <div className="AuthPage">
      {/* Nagłówek strony */}
      <h1>Memory Game</h1>

      {/* Kontener formularzy logowania i rejestracji */}
      <div className="auth-container">
        {/* Formularz logowania */}
        <div className="auth-form login-form">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            {/* Pole username */}
            <label>
              Username:
              <input
                className='form-input'
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
            </label>
            {/* Pole password */}
            <label>
              Password:
              <input
                className='form-input'
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </label>
            {/* Przycisk logowania */}
            <button className='form-button' type="submit">Login</button>
            {/* Wyświetlanie błędu logowania */}
            {errorLog && <p className="error-message">{errorLog}</p>}
          </form>
        </div>

        {/* Formularz rejestracji */}
        <div className="auth-form register-form">
          <h2>Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            {/* Pole username */}
            <label>
              Username:
              <input
                className='form-input'
                type="text"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
            </label>
            {/* Pole password */}
            <label>
              Password:
              <input
                className='form-input'
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </label>
            {/* Pole potwierdzenia hasła */}
            <label>
              Confirm Password:
              <input
                className='form-input'
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              />
            </label>
            {/* Przycisk rejestracji */}
            <button className='form-button' type="submit">Register</button>
            {/* Wyświetlanie błędu rejestracji */}
            {errorReg && <p className="error-message">{errorReg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
