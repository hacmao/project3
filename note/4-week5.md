# Xây dựng hệ thống IOT+Blockchain  

Theo định hướng của thầy, em đã code một hệ thống blockchain để chứa các hash của các message. Mỗi message sẽ có các thông tin về thiết bị cũng như là thời gian mà message đó được tạo. Người dùng có thể check bằng hash của message trên hệ thống blockchain. 

![](../img/2020-11-03-23-29-20.png)  

Khi xác thực sẽ trả lại được thời gian giao dịch nếu hash hợp lệ, so sánh với thời gian trong message ban đầu thì ta tránh được old message attack.  

![](../img/2020-11-03-23-32-54.png)  


Em xây dựng cơ chế blockchain với 2 loại : 

## Loại 1  
 + mỗi giao dịch được thực hiện sẽ được đẩy vào blockchain rồi mới publish qua mqtt. Bên nhận sẽ nhận gói tin, xác thực trên hệ thống block chain rồi nếu đúng thì mới thực thi lệnh.  
 + Cách này dùng cho những giao dịch quan trọng. 
Em làm demo minh họa với thao tác điều khiển đèn led.  
 1) một file js giả lập thao tác nhập lệnh on/off 
 ```
 pi@raspberrypi:~/Documents/project3/main-project/sensors $ node led-controller.js
Connected to broker!
(0, 1)>
 ```
 2) Tạo message, đẩy vào blockchain 
 3) Đẩy qua mqtt
 4) Led nhận được tin, verify gói tin bằng blockchain
 5) Thực thi lệnh. 

![](../img/2020-11-03-23-36-25.png)

![](../img/2020-11-03-23-36-54.png)  

## Loại 2  
 + Mọi giao dịch vẫn diễn ra bình thường qua mqtt
 + Chỉ thêm bước đẩy hash của giao dịch vào trong blockchain

![](../img/2020-11-03-23-38-04.png)  

Một transaction hiện tại sẽ chỉ lưu giữ hash và time trong mapping.  

![](../img/2020-11-03-23-38-24.png)