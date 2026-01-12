CREATE DATABASE OrderDB;

USE OrderDB;

CREATE TABLE ExportOrder (
                exportOrderID CHAR(36) PRIMARY KEY,
                userID CHAR(36),
                fullName VARCHAR(100),
                email VARCHAR(100),
                phoneNumber VARCHAR(20),
                address VARCHAR(255),
                productDiscountId VARCHAR(10),
                totalPrice INT,
                endowID VARCHAR(10),
                paymentId VARCHAR(10),
                createdAt DATE,
                status ENUM('PENDING', 'CONFIRMED', 'CANCELLED') DEFAULT 'PENDING'
);

USE OrderDB;

CREATE TABLE ExportOrderDetail (
                exportOrderDetailID CHAR(36) PRIMARY KEY,
                exportOrderID CHAR(36),
                productID VARCHAR(10),
                productName VARCHAR(255),
                imageUrl VARCHAR(1000),
                exportPrice INT,
                totalItems INT,
                priceUnit INT
);