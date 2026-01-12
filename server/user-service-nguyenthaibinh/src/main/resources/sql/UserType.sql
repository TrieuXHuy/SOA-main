USE UserDB;

CREATE TABLE UserType (
                          customerTypeId CHAR(1) PRIMARY KEY,
                          description TEXT NOT NULL
);

-- Insert dữ liệu vào bảng UserType
INSERT INTO UserType (customerTypeId, description) VALUES
                                                       ('S', 'Tổng chi tiêu tối thiểu 50 triệu'),
                                                       ('A', 'Tổng chi tiêu tối thiểu 20 triệu\nTổng chi tiêu tối đa 50 triệu'),
                                                       ('B', 'Tổng chi tiêu tối thiểu 5 triệu\nTổng chi tiêu tối đa 20 triệu'),
                                                       ('C', 'Chi tiêu tối đa 5 triệu');
