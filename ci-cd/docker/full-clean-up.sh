#!/bin/bash

echo "Note: It's okay if this fails, it is only clean up commands"
docker rm -f backend
docker rm -f frontend
docker rm -f database
docker rm -f backend-test
docker rm -f frontend-test
docker rm -f backend-testing
docker rm -f frontend-testing
docker network rm barber-network

exit 0
