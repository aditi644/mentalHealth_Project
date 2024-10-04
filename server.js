// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import pg from "pg";

// const app = express();
// const port = 3000;

// // const db = new pg.Client({
// //   user : "postgres",
// //   password : "anjusql#2004",
// //   database : "secrets",
// //   host : "localhost",
// //   port : 5432,
// // })


// app.use(bodyParser.json());
// // Serve static files (like HTML, CSS, JS) from the 'public' folder
// app.use(express.static(path.join(__dirname, 'public')));



// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// // For the login and signup pages
// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'login.html'));
// });

// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, 'signup.html'));
// });

// // Define the home route
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'mentalHealth.html'));
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
// });


// // Signup Route
// app.post('/signup', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const result = await pool.query(
//             'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
//             [username, email, hashedPassword]
//         );
//         res.status(201).json({ success: true, message: 'User created successfully' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error creating user' });
//     }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//         if (result.rows.length > 0) {
//             const user = result.rows[0];
//             const passwordMatch = await bcrypt.compare(password, user.password);

//             if (passwordMatch) {
//                 res.json({ success: true, message: 'Login successful' });
//             } else {
//                 res.json({ success: false, message: 'Invalid password' });
//             }
//         } else {
//             res.json({ success: false, message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error logging in' });
//     }
// });

// app.listen(3000, () => {
//     console.log(`Server running on port ${port}`);
// });

// Import the required modules using ES module syntax
// Load the required modules
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // To handle __dirname with ES modules
import pkg from 'pg'; // Import the pg module as a default export
const { Client } = pkg; 
import pg from 'pg';
const { Pool } = pg; 

import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';


// Create an Express application
const app = express();
const port = 3000;

// Set up the directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up the database connection
const client = new Client({
    user : "postgres",
    password : "anjusql#2004",
    database : "secrets",
    host : "localhost",
    port : 5432,                   // PostgreSQL port, typically 5432
});

// const pool = new Pool({
//     user : "postgres",
//     password : "anjusql#2004",
//     database : "secrets",
//     host : "localhost",
//     port : 5432,                 // Default PostgreSQL port
// });

// Connect to the PostgreSQL database
client.connect((err) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Connected to the PostgreSQL database.');
    }
});

// Serve static files (like CSS and JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming request bodies in a middleware before your handlers
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
// Define routes for login and signup
app.get('/loginPage.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/loginPage.html')); // Serve the login page
});

app.get('/SignupPage.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/SignupPage.html')); // Serve the signup page
});

// Handle form submission for signup
// Signup route
app.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(req.body);
    // Log to check the received values
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }
    

    const hashedPassword = await bcrypt.hash(password, 10);

   
    try {
        
        
    const checkResult = await client.query("select * from myuser where email = $1", [email] );
    if(checkResult.rows.length > 0)
    {
      console.log("Email already exist, Trying logging in");
      return res.status(400).send("Email already exists, try logging in.");
    } else {
      const result = await client.query("INSERT INTO myuser(email, password) VALUES ($1, $2)",[email,password]);
      console.log(result);
      res.send('User registered successfully');
    }
}
    catch(err)
  {
    console.log(err);
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
   

    try {
        const result = await client.query('SELECT * FROM myuser WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return res.redirect('index.html');
            }
            return res.status(401).send('Invalid credentials');
        }
        return res.status(404).send('User not found');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in user');
    }
});

// Define the home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve the main page
});

// POST endpoint to handle form submission
app.post('/register', async (req, res) => {
    const { name, email } = req.body;

    try {
        // Insert the data into the PostgreSQL database
        await client.query("INSERT INTO mindfulness_sessions (name, email) VALUES ($1, $2)", [name, email]);

        // Send a success response
        res.send("Registration successful!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});



