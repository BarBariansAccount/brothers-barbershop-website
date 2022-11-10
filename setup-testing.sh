#!/bin/bash

./ci-cd/docker/clean-up.sh
./ci-cd/docker/build-test.sh
./ci-cd/docker/test.sh
