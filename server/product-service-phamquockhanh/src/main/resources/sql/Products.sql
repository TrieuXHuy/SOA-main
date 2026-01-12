CREATE DATABASE ProductsDB;

USE ProductsDB;

CREATE TABLE Products (
                        productID VARCHAR(10) PRIMARY KEY,
                        productName VARCHAR(255),
                        exportPrice INT,
                        importPrice INT,
                        supplierID VARCHAR(10),
                        createdAt DATE,
                        shelfLife INT,
                        productTypeID VARCHAR(10),
                        description VARCHAR(255),
                        rating DECIMAL(2, 1),
                        sold INT,
                        view INT,
                        sale DECIMAL(2, 1),
                        FOREIGN KEY (productTypeID) REFERENCES ProductsDB.ProductType(productTypeID)
);

INSERT INTO Products VALUES
                        ('SP001', 'Cảm biến DHT11', 20000, 14000, 'NCC001', '2025-01-10', 2, 'CBI', 'Cảm biến đo nhiệt độ và độ ẩm kỹ thuật số, hoạt động trong khoảng điện áp từ 3.5V đến 5V. Thích hợp cho các ứng dụng cơ bản về môi trường như máy đo thời tiết, thiết bị cảnh báo nhiệt độ/độ ẩm.', 3.8, 326, 120, 0.1),
                        ('SP002', 'Cảm biến DHT22', 45000, 29000, 'NCC001', '2025-02-12', 2, 'CBI', 'Phiên bản nâng cấp của DHT11 với độ chính xác cao hơn và phạm vi đo rộng hơn. Điện áp hoạt động từ 3.3V đến 6V, thích hợp cho các ứng dụng yêu cầu dữ liệu môi trường ổn định và chính xác.', 4.5, 154, 10, 0.2),
                        ('SP003', 'Cảm biến HC-SR04', 30000, 19600, 'NCC002', '2025-03-05', 2, 'CBI', 'Dùng để đo khoảng cách bằng sóng siêu âm. Có thể đo từ 2cm đến 400cm với độ chính xác cao. Rất phổ biến trong robot tránh vật cản và đo mức chất lỏng.', 4.3, 40, 1209, 0.3),
                        ('SP004', 'Cảm biến PIR', 25000, 21000, 'NCC002', '2025-01-20', 2, 'CBI', 'Phát hiện chuyển động của người hoặc vật thể bằng cảm biến hồng ngoại. Ứng dụng trong các hệ thống báo trộm, chiếu sáng thông minh, tự động mở cửa.', 4.1, 348, 129, 0.3),
                        ('SP005', 'Cảm biến ánh sáng BH1750', 35000, 15400, 'NCC003', '2025-04-01', 2, 'CBI', 'Đo cường độ ánh sáng (Lux) bằng phương pháp quang điện, xuất tín hiệu kỹ thuật số. Sử dụng giao tiếp I2C, rất thích hợp cho các ứng dụng giám sát môi trường, điều chỉnh đèn tự động.', 3.9, 186, 15, 0.2),
                        ('SP006', 'Cảm biến gia tốc MPU6050', 50000, 45500, 'NCC003', '2025-01-15', 2, 'CBI', 'Tích hợp cảm biến gia tốc 3 trục và con quay hồi chuyển 3 trục trong một module. Sử dụng giao tiếp I2C. Phù hợp cho robot tự cân bằng, thiết bị VR, đo chuyển động.', 4.0, 293, 66, 0.5),
                        ('SP007', 'Cảm biến vân tay R307', 150000, 17500, 'NCC004', '2025-03-10', 2, 'CBI', 'Nhận dạng vân tay với khả năng lưu trữ và so sánh vân tay trên chip. Dùng trong hệ thống kiểm soát ra vào, chấm công và các thiết bị bảo mật.', 3.8, 407, 536, 0.6),
                        ('SP008', 'Cảm biến khí MQ-135', 40000, 28800, 'NCC004', '2025-02-28', 2, 'CBI', 'Phát hiện nhiều loại khí độc hại như NH3, CO2, hơi rượu, khói... Thường được sử dụng trong hệ thống cảnh báo khí gas hoặc đánh giá chất lượng không khí.', 4.5, 108, 5747, 0.7),
                        ('SP009', 'Cảm biến áp suất BMP180', 55000, 33600, 'NCC005', '2025-04-20', 2, 'CBI', 'Đo áp suất khí quyển với độ chính xác cao, đồng thời có thể tính được độ cao so với mực nước biển. Giao tiếp qua I2C.', 4.0, 335, 56, 0.3),
                        ('SP010', 'Cảm biến dòng ACS712', 60000, 25200, 'NCC005', '2025-02-15', 2, 'CBI', 'Đo dòng điện xoay chiều hoặc một chiều, có các dải dòng 5A, 20A, 30A tùy loại. Tín hiệu đầu ra tương tự, dễ dàng đọc bởi vi điều khiển.', 4.2, 33, 257, 0.4),
                        ('SP011', 'Arduino Uno', 120000, 63000, 'NCC006', '2025-01-30', 3, 'BRD', 'Board vi điều khiển phổ biến nhất, dễ lập trình, nhiều tài liệu hỗ trợ. Phù hợp cho người mới bắt đầu học IoT, lập trình nhúng.', 3.7, 261, 354, 0.5),
                        ('SP012', 'Arduino Mega 2560', 250000, 175000, 'NCC006', '2025-02-20', 3, 'BRD', 'Có nhiều chân GPIO hơn Uno, dung lượng nhớ lớn, phù hợp cho dự án phức tạp, điều khiển nhiều thiết bị cùng lúc.', 5.0, 284, 7, 0.1),
                        ('SP013', 'Raspberry Pi 4', 1200000, 840000, 'NCC007', '2025-03-12', 3, 'BRD', 'Máy tính mini có khả năng chạy hệ điều hành như một PC thu nhỏ. Hỗ trợ kết nối HDMI, USB, LAN, WiFi. Dùng cho AI, server, học lập trình.', 4.8, 365, 45, 0.2),
                        ('SP014', 'ESP8266 NodeMCU', 80000, 56000, 'NCC008', '2025-04-05', 2, 'MOD', 'Tích hợp WiFi, lập trình như Arduino. Rất nhỏ gọn, tiết kiệm điện, phù hợp làm thiết bị IoT.', 3.9, 72, 575, 0.1),
                        ('SP015', 'ESP32 Devkit V1', 110000, 84000, 'NCC008', '2025-02-28', 2, 'MOD', 'Mạnh hơn ESP8266, có Bluetooth và nhiều chân hơn. Phù hợp cho các dự án có nhiều cảm biến, kết nối không dây.', 4.1, 405, 4574, 0.3),
                        ('SP016', 'STM32F103C8T6', 90000, 63000, 'NCC006', '2025-01-08', 3, 'BRD', 'Vi điều khiển ARM Cortex-M3, tốc độ xử lý nhanh, giá rẻ. Phù hợp cho các dự án công nghiệp cần hiệu suất cao.', 4.2, 359, 45, 0.3),
                        ('SP017', 'IC ATmega328P', 50000, 40600, 'NCC006', '2025-03-18', 5, 'IC', 'Chip chính của Arduino Uno, có thể dùng để tạo board tùy chỉnh.', 4.0, 111, 7445, 0.5),
                        ('SP018', 'IC NE555', 15000, 10500, 'NCC003', '2025-04-10', 5, 'IC', 'IC định thời, tạo xung vuông, dùng trong mạch nháy LED, tạo tiếng còi...', 4.3, 386, 768, 0.5),
                        ('SP019', 'IC LM358', 12000, 8400, 'NCC003', '2025-01-25', 5, 'IC', 'Op-amp kép, dùng để khuếch đại tín hiệu analog.', 4.1, 463, 224, 0.2),
                        ('SP020', 'IC L293D', 20000, 12600, 'NCC003', '2025-03-01', 5, 'IC', 'Driver động cơ DC (4.5V–36V) điều khiển động cơ DC hoặc stepper, có bảo vệ dòng.', 4.0, 474, 990, 0.1),
                        ('SP021', 'MOSFET IRF540', 30000, 23800, 'NCC002', '2025-02-16', 5, 'SMT', 'MOSFET công suất, dùng để điều khiển tải điện áp cao (100V, 33A).', 4.3, 447, 654, 0.2),
                        ('SP022', 'MOSFET IRLZ34N', 28000, 22400, 'NCC002', '2025-03-01', 5, 'SMT', ' MOSFET điều khiển dễ dàng bằng vi điều khiển (logic level).', 3.8, 283, 124, 0.5),
                        ('SP023', 'Transistor 2N3904', 8000, 6200, 'NCC002', '2025-03-21', 5, 'SMT', 'Transistor NPN thông dụng, phù hợp điều khiển dòng nhỏ.', 3.9, 450, 438, 0.3),
                        ('SP024', 'Diode 1N4007', 5000, 3500, 'NCC002', '2025-01-29', 5, 'SMT', 'Diode chỉnh lưu chịu được dòng lớn và điện áp cao (1000V, 1A).', 4.0, 54, 67, 0.2),
                        ('SP025', 'Module WiFi ESP-01', 90000, 41300, 'NCC008', '2025-04-03', 2, 'MOD', 'Phiên bản thu nhỏ của ESP8266, chuyên dùng cho IoT.', 4.2, 225, 656, 0.8),
                        ('SP026', 'Module Bluetooth HC-05', 85000, 59500, 'NCC008', '2025-02-11', 2, 'MOD', 'Module Bluetooth hỗ trợ giao tiếp UART, dễ dùng với Arduino.', 4.4, 100, 14, 0.9),
                        ('SP027', 'Module RFID RC522', 100000, 84000, 'NCC004', '2025-01-22', 2, 'MOD', 'Module đọc thẻ RFID 13.56 MHz, dùng xác thực người dùng.', 4.1, 439, 908, 0.7),
                        ('SP028', 'Màn hình OLED 0.96 inch', 120000, 126000, 'NCC007', '2025-02-05', 2, 'DSP', 'Màn hình đơn sắc, hiển thị văn bản và đồ họa đơn giản.', 4.3, 69, 912, 0.7),
                        ('SP029', 'STM32F103C8T6', 200000, 140000, 'NCC007', '2025-03-17', 2, 'DSP', 'Màn hình màu với giao tiếp SPI, dùng hiển thị hình ảnh, giao diện.', 4.4, 379, 91, 0.6),
                        ('SP030', 'Relay 5V', 18000, 12600, 'NCC009', '2025-01-19', 3, 'RLY', 'Rơ-le cho phép vi điều khiển điều khiển thiết bị công suất lớn (đèn, máy bơm...).', 3.8, 407, 12, 0.1);

