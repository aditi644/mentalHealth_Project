// Example for handling login form submission
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent the default form submission

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Send data to the server
  const response = await fetch('/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  console.log(data); // Handle the response accordingly
});
