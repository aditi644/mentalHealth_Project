import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user : "postgres",
  password : "anjusql#2004",
  database : "secrets",
  host : "localhost",
  port : 5432,
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try{
    const checkResult = await db.query("select * from users where email = $1", [email] );
    if(checkResult.rows.length > 0)
    {
      console.log("Email already exist, Trying logging in");
    } else {
      const result = db.query("INSERT INTO users(email, password) VALUES ($1, $2)",[email,password]);
      console.log(result);
    }
  }
  catch(err)
  {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try{
    const result = await db.query("select * from users where email = $1", [email] );
    if(result.rows.length > 0)
    {
      const user = result.rows[0];
      const strongPassword = user.password;
      if(password== strongPassword)
      {
        res.render("sender.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not Found");
    }
  }
  catch(err)
  {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
