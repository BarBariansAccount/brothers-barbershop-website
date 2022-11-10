#!/bin/bash

# Clean up old docker containers and networks
docker rm -f backend
docker rm -f frontend
docker rm -f database
docker network rm barber-network

# Setup network
docker network create barber-network

# Build containers
docker build -t barbershop:backend -f "ci-cd/docker/backend-testing-dockerfile" .
# docker build -f frontend-dockerfile -t barbershop:frontend ci-cd/docker

# Run database containers
docker run --name database -v "$PWD/ci-cd/init-db.sh":/docker-entrypoint-initdb.d/init-db.sh -e POSTGRES_PASSWORD=November199853@ -e POSTGRES_DB=barbershop --net barber-network -d postgres

# Sleep for a bit to let the databse initialize
sleep 3

# Run app containers
docker run -p 5001:5001 --net barber-network --name backend -d barbershop:backend 
# docker run -p 8080:8080 --net barber-network --name frontend -d barbershop:frontend
