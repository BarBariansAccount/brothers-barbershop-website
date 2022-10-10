#!/bin/bash

# Clean up old docker containers and images
docker rm -f $(docker ps -aq)

# Setup network
docker network create barber-network

# Build containers
docker build -f backend-dockerfile -t barbershop:backend .
# docker build -f frontend-dockerfile -t barbershop:frontend .

# Run containers
docker run --name barbershopdb -v "$PWD/init-db.sh":/docker-entrypoint-initdb.d/init-db.sh -e POSTGRES_PASSWORD=November199853@ -e POSTGRES_DB=barbershop --net barber-network -d postgres

# Remove the -p argument from the backend when deploying, it is only for testing
docker run -p 5001:5001 --net barber-network -d barbershop:backend 
# docker run -p 8080:8080 --net barber-network -d barbershop:frontend 
