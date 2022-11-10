#!/bin/bash

# Setup network
docker network create barber-network

# Build containers
docker build -t barbershop:backend -f "dockerfiles/backend-dockerfile" .
# docker build -t barbershop:frontend -f "dockerfiles/frontend-dockerfile" .
