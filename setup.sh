#!/bin/bash

# Clean up old docker containers and images
docker rm -f $(docker ps -aq)

# Setup network
docker network create barber-network

# Build and run containers
docker build -f Dockerfile -t barbershop:custom .
docker run --name barbershopdb -v "$PWD/init-db.sh":/docker-entrypoint-initdb.d/init-db.sh -e POSTGRES_PASSWORD=November199853@ -e POSTGRES_DB=barbershop -p 5432:5432 --net barber-network -d postgres
docker run -p 8080:8080 --net barber-network -d barbershop:custom
