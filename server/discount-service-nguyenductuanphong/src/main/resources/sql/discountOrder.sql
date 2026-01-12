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
