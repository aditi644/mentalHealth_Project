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

  if (response.ok) {
    // If login is successful, change the button text
    document.getElementById('loginButton').innerText = 'Logged In';
    // Optionally, you can disable the button to prevent further clicks
    document.getElementById('loginButton').disabled = true;
} else {
    // Handle login failure (show error message or something)
    alert('Login failed. Please check your credentials.');
}

  const data = await response.json();
  console.log(data); // Handle the response accordingly
});
