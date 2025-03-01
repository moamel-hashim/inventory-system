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


app.post('/BadgeTransaction', async (req, res, next) => {
  // Ideally wrap these operations in a transaction to ensure data integrity.
  try {
    const {
      FacilityID,
      OfficerFirstName,
      OfficerLastName,
      ActionType,
      TempBadgeNumber,
      TempBadgeType
    } = req.body;

    const requiredFields = [
      'OfficerFirstName',
      'OfficerLastName',
      'ActionType',
      'TempBadgeNumber',
      'TempBadgeType'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }


    console.log('POST /BadgeTransaction body:', req.body);

    // Insert the new BadgeTransaction
    await db.query(
      `INSERT INTO "BadgeTransaction"
       ("FacilityID", "OfficerFirstName", "OfficerLastName", "ActionType", "TempBadgeNumber", "TempBadgeType", "TransactionDate", "TransactionTime")
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE, CURRENT_TIME)`,
      [FacilityID, OfficerFirstName, OfficerLastName, ActionType, TempBadgeNumber, TempBadgeType]
    );

    // Based on the ActionType, update the BadgeInventory total.
    if (ActionType === 'CheckOut') {
      await db.query(
        `UPDATE "BadgeInventory"
         SET "TotalBadges" = "TotalBadges" - 1,
             "LastUpdated" = CURRENT_TIMESTAMP
         WHERE "FacilityID" = $1`,
        [FacilityID]
      );
    } else if (ActionType === 'Return') {
      await db.query(
        `UPDATE "BadgeInventory"
         SET "TotalBadges" = "TotalBadges" + 1,
             "LastUpdated" = CURRENT_TIMESTAMP
         WHERE "FacilityID" = $1`,
        [FacilityID]
      );
    }

    // Return the new transaction record as a response.
    res.sendStatus(201);
  } catch (err) {
    console.error('Error in /BadgeTransaction:', err.message);
    next(err);
  }
});


// get all badges inventory
app.get('/BadgeInventory', async(req, res, next) => {
  try {
    const result = await db.query('SELECT *  FROM "BadgeInventory"');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: 'internal server error'});
    next(err);
  }
})


// get badge transaction history
app.get('/BadgeTransaction', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM "BadgeTransaction"');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: 'internal server error'});
    next(err);
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
    next(err);
  }
});

// Post into facility. facility name

app.post('/Facility', async(req, res, next) => {
  try {
    const {facility_name} = req.body;
    console.log('POST /BadgeTransaction body:', req.body);
    await db.query(
      `INSERT INTO "Facility" ("facility_name")
      VALUES($1)`,
      [facility_name]
    );
    console.log('this is a post for facility', req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
})


// port connection
app.listen(process.env.DEV_SERVER_PORT, () => {
  console.log('server has started on port 8080');
})
