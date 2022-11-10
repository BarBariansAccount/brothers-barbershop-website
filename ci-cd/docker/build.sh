#!/bin/bash

# Setup network
docker network create barber-network

# Build containers
docker build -t barbershop:backend -f "ci-cd/docker/dockerfiles/backend-dockerfile" .
# docker build -t barbershop:frontend -f "ci-cd/docker/dockerfiles/frontend-dockerfile" .
