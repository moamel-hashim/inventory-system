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


//post information to the badge transaction system


app.post('/BadgeTransaction', async(req, res, next) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
})

// get all badges inventory
app.get('/BadgeInventory', async(req, res, next) => {
  try {
    const result = await db.query('SELECT *  FROM "BadgeInventory"');
    console.log('this is a console log for BadgeInventory result value', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
})


// get badge transaction history
app.get('/BadgeTransaction', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM "BadgeTransaction"');
    console.log('this is a console log for BadgeTransaction result value', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: 'internal server error'});
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
