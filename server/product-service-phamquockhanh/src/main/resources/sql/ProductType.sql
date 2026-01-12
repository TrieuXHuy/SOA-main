USE ProductsDB;

CREATE TABLE ProductType (
                        productTypeID VARCHAR(10) PRIMARY KEY,
                        productTypeName NVARCHAR(100),
                        description NVARCHAR(255)
);

INSERT INTO ProductType VALUES
                      ('CBI', 'Cảm biến', 'Thiết bị đo lường các thông số vật lý/môi trường'),
                      ('BRD', 'Board mạch', 'Bảng mạch phát triển dùng cho lập trình nhúng'),
                      ('MOD', 'Module', 'Các module mở rộng chức năng cho vi điều khiển'),
                      ('IC', 'IC', 'Mạch tích hợp dùng trong xử lý tín hiệu hoặc điều khiển'),
                      ('SMT', 'Linh kiện bán dẫn', 'Linh kiện điện tử cơ bản như MOSFET, transistor, diode'),
                      ('DSP', 'Hiển thị', 'Thiết bị hiển thị như màn hình OLED, TFT'),
                      ('RLY', 'Relay', 'Bộ chuyển mạch điện tử điều khiển thiết bị tải');
