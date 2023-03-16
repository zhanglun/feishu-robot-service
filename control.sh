#! /usr/bin/env bash
cd /home/admin/feishu-robot

pm2 delete feishu-robot 2> /dev/null

rm -rf output
tar -zxvf output.tar.gz

pm2 start output/dist/main.js --name feishu-robot

pm2 status

# post 