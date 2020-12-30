# Tìm hiểu blockchain  

## Tổng quan cơ chế hoạt động của blockchain 
Cơ chế hoạt động cơ bản của block chain là : hệ thống phân tán, các nút đều có quyền truy cập cơ sở dữ liệu, trao đổi trực tiếp với nhau và không thông qua bên thứ ba. Một khi giao dịch được thực hiện, thông tin giao dịch được lưu vào cơ sở dữ liệu thì sẽ được đảm bảo là không thể bị sửa đổi. Từ đó có thể chứng thực được thông tin.  
Một người khi muốn tham gia vào mạng lưới bitcoin sẽ được cấp phát 1 cặp khóa public - private. Khi muốn thực hiện một giao dịch, đơn giản người dùng sẽ kí bằng khóa bí mật. Tiếp đến, mạng lưới sẽ xác nhận bằng khóa công khai rồi add vào cơ sở dữ liệu. Khi giao dịch đã được add vào cơ sở dữ liệu, xem như là giao dịch thành công. Bằng việc này, chúng ta có thể dùng cho các công nghệ khác như vote, xác thực, ...  

## Block chain với IOT  

![](../img/2020-10-12-21-03-03.png)

Blockchain sẽ xác thực các giao dịch giữa các ứng dụng blockchain trong mạng. Đảm bảo dữ liệu toàn vẹn, không đáng tin cậy.  

## Cài đặt và lập trình blockchain  

Cài đặt và thực hiện trên `truffle`.  

Khởi tạo :  
 + Khởi tạo project với `truffle init` trong thư mục tương ứng.  
 + Sửa file `sol` trong thư mục `contracts`.
 + Sửa file deployed trong `migrations`. 
 + Sửa file cấu hình `truffle-config.json`

Chạy :  
```
 + truffle develop
 + compile
 + migrate
 + Hello.deployed().then(function(result) { app = result; });
 + app.methods()
 + app.get()
 + web3.eth.getAccounts()
```

Trực quan hóa với `ganache`. Sửa file `truffle-config.js` :  

![](../img/2020-10-10-14-16-38.png)  

Các thông số xem trong app `ganache`.  
Compile lại bằng lệnh : `truffle migrate --network development --compile-all --reset`.  
Ta có thể setup nhiều network khác nhau, mỗi lần chỉ cần compile với tên network là được. Sau đó, thực hiện các giao dịch trên network bằng cách truy cập vào bằng câu lệnh : `truffle console --network development`.  

Sau đó thực hiện các lệnh để gọi hàm như trên.  

![](../img/2020-10-10-14-19-01.png)


Tiếp đến, với từng hàm ta có thể set thêm một list để đặt người nhận, người gửi.  

```
web3.eth.getAccounts().then(function(result) {accounts = results;})
app.set("hello", {from : accounts[0]})
```

 + Lấy số ethereum còn trong tài khoản :  
```
web3.eth.getBalance(accounts[2])
```

 + Trong solidity : 
```
function info() public view returns(string memory) {
    return uint2str(msg.sender.balance);
}
```

 + Học cách chuyển ethereum giữa các tài khoản :  

```
function sendEth(address payable receiver) public payable{
        require(msg.value <= msg.sender.balance);
        require(msg.value != 0);
        receiver.transfer(msg.value);
        emit LogTransaction(msg.sender, receiver, msg.value);

    }
// $ app.sendEth(accounts[0] , {value : 10000})
```

## Các ví dụ đã code 

### Vote  

Quản trị viên tạo một cuộc họp để vote với tên các thí sinh với các id tương ứng từ 0 - n. Sau đó, quản trị viên sẽ trao quyền vote cho từng người một. Mỗi voter sẽ được quyền vote đúng 1 lần cho 1 người duy nhất. Sau đó, sẽ tổng hợp lại kết quả và tìm ra người chiến thắng.  

![](../img/2020-10-13-22-15-12.png)

![](../img/2020-10-13-22-15-51.png)  

![](../img/2020-10-13-22-15-29.png)  

## Cuộc đấu giá  

Các người chơi tham gia một cuộc đấu giá trực tuyến. Mỗi người tham gia được quyền đấu giá. Mỗi lần đấu giá phải cao hơn lần trước. Nếu có người trả giá cao hơn, số tiền của người đấu giá cao nhất lần trước sẽ được giữ lại bởi hệ thống và được trả lại khi người tham gia từ bỏ quyền đấu giá. Cuối cùng, quản trị viên công bố kết thúc phiên đấu giá và đưa tiền cho người thụ hưởng.  

![](../img/2020-10-13-22-26-18.png)  

![](../img/2020-10-13-22-26-44.png)  

![](../img/2020-10-13-22-27-36.png)

### Giao dịch online  

Người bán tiến hành tạo constract `Purchase` với tham số đầu vào là giá trị mặt hàng. Sau đó, các bên tiến hành giao dịch. Tiền sẽ được hệ thống giữ và được chuyển từ người mua sang người nhận theo từng bước tuân theo trạng thái của giao dịch : khởi tạo - đặt mua - confirm nhận hàng - đưa tiền cho người bán.  

Sau khi accounts 1 bán cho accounts 2 1 sản phẩm giá 10 eth thì tài khoản đã được thay đổi.  

![](../img/2020-10-13-21-53-53.png)  

Event tạo ra trong quá trình giao dịch :  

![](../img/2020-10-13-21-53-32.png)  

