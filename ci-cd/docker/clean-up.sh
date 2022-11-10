#!/bin/bash

# Clean up old docker containers and networks
docker rm -f backend
docker rm -f frontend
docker rm -f database
docker rm -f backend-test
docker rm -f frontend-test
docker network rm barber-network
docker network rm barber-network-test

exit 0
