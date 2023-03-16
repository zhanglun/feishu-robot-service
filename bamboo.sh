#! /usr/bin/env bash
username="123";
project="123123";
curl -X POST -H "Content-Type: application/json" -d '{"username": "'"${username}"'", "project":"super-aicc-base", "result":"打包成功"}' http://localhost:3000/webhooks/bamboo/build