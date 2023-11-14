// LoginButton.js

import React from 'react';
import './LoginButton.css';// Import the CSS file

function LoginButton() {
  const handleLogin = () => {
    // Implement your login logic here
  };

  return (
    <button className="login-button" onClick={handleLogin}>
      Login
    </button>
  );
}

export default LoginButton;

