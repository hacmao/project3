#!/bin/bash

mosquitto -p 1028 &
node ./sensors/blink.js & 
node ./server/wot-server/wot-servers.js  

