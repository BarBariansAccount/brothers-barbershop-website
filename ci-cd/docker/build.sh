#!/bin/bash

# Setup network
docker network create barber-network

# Build containers
docker build -t barbershop:backend -f "ci-cd/docker/backend-dockerfile" .
# docker build -t barbershop:frontend -f "ci-cd/docker/frontend-dockerfile" .
