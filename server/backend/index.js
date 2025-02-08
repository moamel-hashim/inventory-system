import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pg from 'pg'

const {Pool} = pg;
const app = express();


// middleware

app.use(cors());
app.use(express.json())


// database connection

const db = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: "8080",
  database: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})


//ROUTES//

// add the total number of all temp cards//

// add each temp badge identification number

// get all temp badge identification number and the total amount

app.get('/inventorySystems', async (req, res, next) => {
  try {
    console.log(req.body);

  } catch (err) {
    console.error(err.message);
  }
})

// port connection
app.listen(process.env.PORT, () => {
  console.log('server has started on port 8080');
})
