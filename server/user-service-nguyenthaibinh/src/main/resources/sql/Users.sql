CREATE DATABASE UserDB;

USE UserDB;

CREATE TABLE Users (
    userID CHAR(36) PRIMARY KEY,
    fullName VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phoneNumber VARCHAR(20),
    password VARCHAR(255),
    role VARCHAR(20),
    createdAt DATETIME,
    dateOfBirth DATE,
    address VARCHAR(255),
    customerTypeId VARCHAR(10)
);

INSERT INTO Users VALUES
                (UUID(), 'Nguyễn Văn An', 'vanan01@gmail.com', '0955538531', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-06', '1968-12-19', '123 Lê Lợi, Quận 1, TP.HCM', 'B'),
                (UUID(), 'Trần Thị Bình', 'tranbinh@gmail.com', '0956320186', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-07', '1990-07-25', '45 Hai Bà Trưng, Quận 3, TP.HCM', 'S'),
                (UUID(), 'Lê Văn Cường', 'kucuong@gmail.com', '0946922303', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-08', '1968-05-24', '12 Trần Hưng Đạo, Hà Nội', 'C'),
                (UUID(), 'Phạm Thị Dung', 'dungyun@gmail.com', '0919573885', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-09', '1973-12-06', '78 Nguyễn Huệ, Quận 1, TP.HCM', 'A'),
                (UUID(), 'Hoàng Văn Em', 'emiu@gmail.com', '0913670367', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-10', '1966-03-27', '34 Cách Mạng Tháng 8, Hà Nội', 'B'),
                (UUID(), 'Đỗ Thị Phương', 'dophuong@gmail.com', '0978560572', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-11', '1989-11-27', '90 Pasteur, Quận 1, TP.HCM', 'C'),
                (UUID(), 'Bùi Văn Giang', 'gianggiang@gmail.com', '0924211016', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-12', '1966-02-02', '56 Lý Thường Kiệt, Hà Nội', 'A'),
                (UUID(), 'Ngô Thị Hòa', 'ngohoa@gmail.com', '0381307365', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-13', '2002-11-09', '23 Nguyễn Trãi, Quận 5, TP.HCM', 'A'),
                (UUID(), 'Vũ Văn Long', 'longvu@gmail.com', '0990101186', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-14', '1975-06-16', '67 Phan Đình Phùng, Đà Nẵng', 'C'),
                (UUID(), 'Đặng Thị Khuê', 'dangthikhue@gmail.com', '0917460376', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-15', '1974-07-01', '89 Lê Duẩn, Quận Thanh Khê, Đà Nẵng', 'S'),
                (UUID(), 'Lý Văn Luận', 'lyluan@gmail.com', '0941376145', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-16', '1981-06-10', '11 Phạm Văn Đồng, TP.HCM', 'S'),
                (UUID(), 'Trịnh Thị Mai', 'maitrinh@gmail.com', '0990374984', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-17', '1959-09-20', '135 Trường Chinh, Hà Nội', 'B'),
                (UUID(), 'Tạ Văn Nam', 'namtaa@gmail.com', '0948561153', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-18', '1968-04-11', '145 Nguyễn Văn Cừ, TP.HCM', 'C'),
                (UUID(), 'Mai Thị Ong', 'chiongmai14@gmail.com', '0948843940', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-19', '1987-01-29', '99 Võ Văn Tần, Quận 3, TP.HCM', 'C'),
                (UUID(), 'Châu Văn Phong', 'phongba@gmail.com', '0930450221', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-20', '1962-03-02', '200 Xô Viết Nghệ Tĩnh, TP.HCM', 'B'),
                (UUID(), 'Trương Thị Quỳnh', 'quynhtruong@gmail.com', '0991631330', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-21', '1964-03-08', '155 Lê Văn Sỹ, Quận Tân Bình, TP.HCM', 'S'),
                (UUID(), 'Hồ Thị Sen', 'hoasen@gmail.com', '0954348811', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-22', '1973-11-12', '188 Phan Văn Trị, TP.HCM', 'B'),
                (UUID(), 'Lâm Văn Tuấn', 'vantuan@gmail.com', '0982580581', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-23', '1979-09-22', '190 Điện Biên Phủ, TP.HCM', 'C'),
                (UUID(), 'Dương Văn Trường', 'truongduong@gmail.com', '0911324889', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-24', '1989-10-05', '210 Nguyễn Oanh, TP.HCM', 'A'),
                (UUID(), 'Cao Thị Uyên', 'caothiuyen@gmail.com', '0976925586', '$2a$10$BuCb7BiidIHuh29ku2g4yuBw7jTpJWlskbGBrV/IqqVFG0cRMCEA2', 'user', '2025-06-25', '2006-02-14', '225 Tôn Đức Thắng, Hà Nội', 'S');