'use strict';

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
  connectionString: process.env.DATABASE_URL,
})


//ROUTES//

// add the total number of all temp cards//

// add each temp badge identification number
app.get('/BadgeInventory', async(req, res, next) => {
  try {
    console.log(req.body);
    res.send('badge inventory its working!')
  } catch (err) {
    console.error(err.message);
  }
})
// get all temp badge identification number and the total amount
app.get('/BadgeTransaction', async (req, res, next) => {
  try {
    console.log(req.body);
    res.send('badge transaction its working!');
  } catch (err) {
    console.error(err.message);
  }
})

// get facility information
app.get('/Facility', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM "Facility"');
    console.log('this is a console log for result value',result.rows);
    res.json(result.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: 'Internal server error'});
  }
});


// port connection
app.listen(process.env.DEV_SERVER_PORT, () => {
  console.log('server has started on port 8080');
})
