#!/bin/bash

echo "Note: It's okay if this fails, it is only clean up commands"
docker rm -f backend
docker rm -f frontend
docker rm -f database
docker rm -f backend-test
docker rm -f frontend-test
docker network rm barber-network
docker network disconnect $(docker ps --filter status=exited -q)
docker network rm --remove-orphans barber-network-dev

exit 0
