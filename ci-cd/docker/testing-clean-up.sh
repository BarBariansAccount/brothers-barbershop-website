#!/bin/bash

echo "Note: It's okay if this fails, it's only clean up commands"
docker rm $(docker ps --filter status=exited -q)
docker rm -f database
docker rm -f backend-test
docker rm -f frontend-test
docker rm -f backend-testing
docker rm -f frontend-testing

exit 0
