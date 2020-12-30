# Báo cáo tuần 3  

## Các thiết bị đã kết nối được  
 + led 
 + lcd 
 + dht11 

## Giao tiếp bằng MQTT  

Thực hiện cài đặt `mosquitto` trên rasperberry pi. Bắt đầu broker bằng câu lệnh :  

```
mosquitto -p 1028 & 
```

Sau đó, có thể thiết lập các client bằng `mosquitto_sub` và `mosquitto_pub` :  

![](../img/2020-10-18-08-32-30.png)  

Cài đặt client bằng node js :  

```js
var mqtt = require('mqtt');
var client = mqtt.connect("mqtt://192.168.1.39:1028");

client.on('connect', () => {
    client.subscribe('/pi/led', (err) => {
        if (err) throw err; 
    }); 
});

client.on('message', (topic, message) => {
    console.log("%s : %s", topic, message.toString());
    client.end();  
} );
```

## Kết nối các sensors giao tiếp bằng mqtt hiển thị lên web  

Chương trình thực hiện bằng cách thiết lập một web server tạo ra các client lắng nghe tới broker về các topic tương ứng với từng sensor. Sau đó, giả sử rằng các thiết bị iot gửi các gói tin mqtt tới topic tương ứng mỗi 2s. Sau đó, khi server lắng nghe được topic, sẽ hiển thị lên cho người dùng.  

Thiết bị iot nhận giá trị rồi gửi tới broker :  

![](../img/2020-10-18-09-16-34.png)  


 + **List sensors**  

![](../img/2020-10-18-09-13-34.png)

 + **LED**  

![](../img/2020-10-18-08-50-48.png)  

 + **DHT11**  

![](../img/2020-10-18-09-13-02.png)


 + **LCD**  

![](../img/2020-10-18-18-06-33.png)  

Đồng thời, với lcd và led, chúng ta có thể truyền tham số từ server, thông qua mqtt để publish message vào `/pi/led_controller` và `/pi/lcd_controller`, sau đó, tại các thiết bị sẽ thực thi các tác vụ theo yêu cầu như tắt bật đèn hay là thay đổi dòng chữ trên lcd.  

