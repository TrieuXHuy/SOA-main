CREATE DATABASE CartDB;

USE CartDB;

CREATE TABLE carts (
    cartItemID CHAR(36) PRIMARY KEY,
    userID CHAR(36),
    productID VARCHAR(10),
    productName VARCHAR(255),
    exportPrice INT,
    sale DECIMAL(2, 1),
    imageUrl VARCHAR(1000),
    productTypeID VARCHAR(10),
    productTypeName NVARCHAR(100),
    supplierName VARCHAR(255),
    totalItems INT,
    priceUnit INT
);