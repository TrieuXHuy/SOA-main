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

USE DiscountDB;
CREATE TABLE DiscountOrder (
                               discountOrderID VARCHAR(10) PRIMARY KEY,
                               name VARCHAR(255),
                               value DECIMAL(5, 2),
                               minOrderValue BIGINT,
                               maxOrderValue BIGINT,
                               maxDiscount BIGINT,
                               startDay DATE,
                               endDay DATE,
                               status VARCHAR(20)
);
INSERT INTO DiscountOrder VALUES
                              ('DO001', 'Giảm 5% cho đơn trên 100k', 0.05, 100000, 500000, 30000, '2025-06-15', '2025-07-15', 'Active'),
                              ('DO002', 'Giảm 10% cho đơn trên 500k', 0.10, 500001, 1000000, 70000, '2025-06-20', '2025-08-20', 'Active'),
                              ('DO003', 'Giảm 7% cho đơn trên 1 triệu', 0.07, 1000001, 5000000, 100000, '2025-07-01', '2025-09-01', 'Active'),
                              ('DO004', 'Giảm 15% cho đơn trên 5 triệu', 0.15, 5000001, NULL, 200000, '2025-06-25', '2025-08-25', 'Active'),
                              ('DO005', 'Giảm 2% cho mọi đơn hàng', 0.02, 0, 10000, 10000, '2025-07-10', '2025-09-10', 'Active');
