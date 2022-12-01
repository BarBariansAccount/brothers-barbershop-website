#!/bin/bash

# Clean up leftover containers and networks
./ci-cd/docker/full-clean-up.sh

# Create network
docker network create barber-network

# Build containers
docker build -t barbershop:backend --target production -f "ci-cd/docker/dockerfiles/backend-dockerfile" .
docker build -t barbershop:frontend --target production -f "ci-cd/docker/dockerfiles/frontend-dockerfile" .

# Run database
docker run --name database -v "$PWD/ci-cd/init-db.sh":/docker-entrypoint-initdb.d/init-db.sh -e POSTGRES_PASSWORD=$1 -e POSTGRES_DB=barbershop --net barber-network -d postgres

# Run containers
docker run -p 5001:5001 --net barber-network --name backend -d barbershop:backend 
docker run -p 9001:8080 --net barber-network --name frontend -d barbershop:frontend
