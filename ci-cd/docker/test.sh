#!/bin/bash

# Run database containers
docker run --name database -v "$PWD/ci-cd/init-db.sh":/docker-entrypoint-initdb.d/init-db.sh -e POSTGRES_PASSWORD=November199853@ -e POSTGRES_DB=barbershop --net barber-network-test -d postgres

# Sleep for a bit to let the databse initialize
sleep 5

# Run app containers
docker run -p 5001:5001 --net barber-network-test --name backend-test -d barbershop:backend-test
# docker run -p 8080:8080 --net barber-network-test --name frontend-test -d barbershop:fronten-test
