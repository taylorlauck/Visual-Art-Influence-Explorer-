
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
  
    loginButton.addEventListener('click', () => {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Perform user authentication (you can use your backend for this)
      // You can use fetch() to send the username and password to your server
      // If authentication is successful, you can redirect to the home page
    });
  });
  