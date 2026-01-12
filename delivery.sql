CREATE DATABASE IF NOT EXISTS DeliveryDB;

USE DeliveryDB;

CREATE TABLE Delivery (
    deliveryID CHAR(36) PRIMARY KEY,
    exportOrderID CHAR(36) NOT NULL,
    ghnOrderCode VARCHAR(50),
    sortCode VARCHAR(50),
    expectedDeliveryTime VARCHAR(255),
    totalFee INT,
    transType VARCHAR(50),
    status VARCHAR(50),
    createdAt DATETIME,
    updatedAt DATETIME,
    INDEX idx_exportOrderID (exportOrderID)
);

