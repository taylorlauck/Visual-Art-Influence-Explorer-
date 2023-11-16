import React, { useState } from 'react';
import './LoginButton.css'; // Import the CSS file

function LoginButton() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Send username and password to the server for authentication
    // For instance, you might use fetch or Axios to send a POST request
    fetch('http://localhost:5000', { // Replace with your backend URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.ok) {
        // Login successful, you might want to redirect or update UI here
        console.log('Login successful');
      } else {
        // Login failed, handle it accordingly
        console.error('Login failed');
      }
    })
    .catch((error) => {
      // Error occurred while fetching or parsing response
      console.error('Error:', error);
    });
};
  

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginButton;


