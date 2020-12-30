# Tương tác với contract bằng javascript  

 + Tạo file abi. File abi giúp chúng ta có thể tương tác được với contract, là một bản mã hóa về các hàm, thuộc tính, ... 

```
solcjs.cmd --bin --abi .\Vote.sol
```

  + Kết nối với ganache  
```
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
```

  + load abi :  
  ```
  abi = JSON.parse("""ABI here""");
  ```

  + load contract :  
  ```
  contract = new web3.eth.Contract(abi);
contract.options.address = "0x1d846A0cc6eb76fc91125307B23dd7F34f1d8117";
  ```
  + Chúng ta có thể gọi các hàm của contract bằng 2 cách `call()` và `send()` 
     + call() : dành cho các hàm trả về giá trị views
     + send() : dành cho các hàm còn lại, có thể chỉ định người gửi thông qua `send({from : sender})`.  
  ```
  var res = await contract.methods.get().call();
  contract.methods.set().send({from : sender});
  ```


![](../img/2020-10-25-22-45-48.png)