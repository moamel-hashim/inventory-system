CREATE SCHEMA "public";
CREATE DATABASE inventorySystem;

CREATE TABLE IF NOT EXISTS "Facility" (
    "facilityID" SERIAL NOT NULL UNIQUE,
    "facility_name" VARCHAR(255) NOT NULL,
    PRIMARY KEY ("facilityID")
);

CREATE TABLE IF NOT EXISTS "BadgeInventory" (
    "InventoryID" SERIAL PRIMARY KEY,
    "FacilityID" INT,
    "TotalBadges" INT NOT NULL,
    "LastUpdated" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("FacilityID") REFERENCES "Facility"("facilityID")
);

CREATE TABLE IF NOT EXISTS "BadgeTransaction" (
    "TransactionID" SERIAL PRIMARY KEY,
    "FacilityID" INT NOT NULL,
    "OfficerFirstName" VARCHAR(20) NOT NULL,
    "OfficerLastName" VARCHAR(20) NOT NULL,
    "ActionType" VARCHAR(20) NOT NULL CHECK ("ActionType" IN ('CheckOut', 'Return')),
    "TempBadgeNumber" VARCHAR(20) NOT NULL CHECK (length("TempBadgeNumber") = 8),
    "TransactionDate" DATE NOT NULL,
    "TransactionTime" TIME NOT NULL,
    FOREIGN KEY ("FacilityID") REFERENCES "Facility"("facilityID")
);
