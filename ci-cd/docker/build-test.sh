#!/bin/bash

# Setup network
docker network create barber-network-test

# Build containers
docker build -t barbershop:backend-test -f "ci-cd/docker/backend-testing-dockerfile" .
# docker build -t barbershop:frontend-test -f "ci-cd/docker/frontend-testing-dockerfile" .
