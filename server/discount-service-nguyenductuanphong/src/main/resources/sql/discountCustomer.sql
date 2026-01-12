CREATE DATABASE DiscountDB;

USE DiscountDB;

CREATE TABLE IF NOT EXISTS DiscountCustomer (
                                                ID VARCHAR(10) PRIMARY KEY,
                                                customerTypeId CHAR(1),
                                                name VARCHAR(100),
                                                discountValue DECIMAL(5,2),
                                                minValueDiscount BIGINT NOT NULL,
                                                maxValueDiscount BIGINT,
                                                minDiscount BIGINT,
                                                maxDiscount BIGINT,
                                                startDay DATE,
                                                endDay DATE,
                                                status VARCHAR(20)
);

INSERT INTO DiscountCustomer (
    ID, customerTypeId, name, discountValue,
    minValueDiscount, maxValueDiscount, minDiscount, maxDiscount,
    startDay, endDay, status
) VALUES
      ('DC001', 'S', 'VIP', 0.20, 50000001, NULL, 50000, 1000000, '2025-06-15', '2025-09-10', 'Active'),
      ('DC002', 'C', 'Khách hàng mới', 0.15, 0, 0, 0, 100000, '2025-06-16', '2025-09-11', 'Active'),
      ('DC003', 'A', 'Khách hàng quen', 0.10, 2000001, 50000000, 30000, 500000, '2025-06-17', '2025-09-12', 'Active'),
      ('DC004', 'B', 'Khách hàng cũ', 0.05, 500000, 20000000, 10000, 100000, '2025-06-17', '2025-09-12', 'Active');
