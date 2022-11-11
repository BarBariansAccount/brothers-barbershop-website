docker rm -f drone
docker rmi drone
sudo /usr/local/bin/drone-runner-exec service stop
sudo /usr/local/bin/drone-runner-exec service uninstall
sudo rm -rf /var/lib/drone
rm /home/e_tripet/.drone-runner-exec/config/log.txt
docker run \
  --volume=/var/lib/drone:/data \
  --env=DRONE_GITHUB_CLIENT_ID=caa70262c30e167f4e40 \
  --env=DRONE_GITHUB_CLIENT_SECRET=0e6d5b163c0c325034f31f71eb79fd69ced2dbea \
  --env=DRONE_RPC_SECRET=ea26053a42cbf18f7843065281583453 \
  --env=DRONE_SERVER_HOST=loop.encs.concordia.ca \
  --env=DRONE_SERVER_PROTO=http \
  --env=DRONE_USER_CREATE=username:Tripe2000,admin:true \
  --publish=8080:80 \
  --publish=443:443 \
  --restart=always \
  --detach=true \
  --name=drone \
  drone/drone:2
sudo install -t /usr/local/bin drone-runner-exec
sudo /usr/local/bin/drone-runner-exec service install --config /home/e_tripet/.drone-runner-exec/config
sudo /usr/local/bin/drone-runner-exec service start
