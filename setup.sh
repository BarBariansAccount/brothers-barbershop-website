#!/bin/bash

# Clean up old docker containers and images
docker rm -f barbershop-backend
docker rm -f barbershop-frontend
docker rm -f barbershop-db
docker network rm barber-network

# Setup network
docker network create barber-network

# Build containers
docker build -f ci-cd/backend-dockerfile -t barbershop:backend .
docker build -f ci-cd/frontend-dockerfile -t barbershop:frontend .

# Run containers
# -e POSTGRES_HOST_AUTH_METHOD=md5
# We can't have the password hard-coded here, this needs to change
docker run --name barbershop-db -v "$PWD/ci-cd/init-db.sh":/docker-entrypoint-initdb.d/init-db.sh -v "$PWD/ci-cd/postgres.conf":/etc/postgresql/postgresql.conf -e POSTGRES_PASSWORD=November199853@ -e POSTGRES_DB=barbershop -p 5432:5432 --network barber-network -d postgres:alpine -c 'config_file=/etc/postgresql/postgresql.conf'

# Remove the -p argument from the backend when deploying, it is only for testing
docker run --name barbershop-backend -p 5001:5001 --network barber-network -d barbershop:backend 
docker run --name barbershop-frontend -p 9001:9001 --network barber-network -d barbershop:frontend 
