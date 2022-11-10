#!/bin/bash

# Setup network
docker network create barber-network-test

# Build containers
docker build -t barbershop:backend-test -f "dockerfiles/backend-testing-dockerfile" .
# docker build -t barbershop:frontend-test -f "dockerfiles/frontend-testing-dockerfile" .
