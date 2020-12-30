// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract IotBlock {
    struct transactInfo{
        uint256 time;
    }
    mapping (string => transactInfo) iotBlock; 

    function pushData(string memory hash, uint256 currentTime) public {
        iotBlock[hash] = transactInfo({
            time : currentTime
        });
    }

    function verify(string memory hash) public view returns (uint256){
        transactInfo memory info;
        info = iotBlock[hash];
        return info.time;
    }
}

