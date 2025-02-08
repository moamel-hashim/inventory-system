CREATE SCHEMA "public";

CREATE TABLE IF NOT EXISTS "Facility" (
	"facilityID" serial NOT NULL UNIQUE,
	"facility_name" varchar(255) NOT NULL,
	PRIMARY KEY ("facilityID")
);

CREATE TABLE IF NOT EXISTS "BadgeInventory" (
    InventoryID INT PRIMARY KEY AUTO_INCREMENT,
    FacilityID INT,
    TotalBadges INT NOT NULL,
    LastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (FacilityID) REFERENCES Facility(FacilityID)
);

CREATE TABLE IF NOT EXISTS "BadgeTransaction" (
    TransactionID SERIAL PRIMARY KEY,
    FacilityID INT NOT NULL,
    OfficerFirstName VARCHAR(20) NOT NULL,
    OfficerLastName VARCHAR(20) NOT NULL,
    ActionType ENUM('CheckOut', 'Return') NOT NULL,
    TempBadgeNumber BIGINT NOT NULL,
    TransactionDate DATE NOT NULL,
    TransactionTime TIME WITHOUT TIME ZONE NOT NULL,
    FOREIGN KEY (FacilityID) REFERENCES Facility(FacilityID)
);
