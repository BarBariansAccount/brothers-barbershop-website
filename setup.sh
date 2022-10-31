#!/bin/bash

# Clean up old docker containers and images
docker rm -f barbershop-backend
docker rm -f barbershop-frontend
docker rm -f barbershop-db
docker network rm barber-network

# Setup network
docker network create barber-network

# Build containers
docker build -f backend-dockerfile -t barbershop:backend .
docker build -f frontend-dockerfile -t barbershop:frontend .

# Run containers
docker run --name barbershop-db -v "$PWD/init-db.sh":/docker-entrypoint-initdb.d/init-db.sh -e POSTGRES_PASSWORD=November199853@ -e POSTGRES_DB=barbershop -p 5432:5432 --network host -d postgres

# Remove the -p argument from the backend when deploying, it is only for testing
docker run --name barbershop-backend -p 5001:5001 --network host -d barbershop:backend 
docker run --name barbershop-frontend -p 9001:9001 --network host -d barbershop:frontend 
