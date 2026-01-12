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