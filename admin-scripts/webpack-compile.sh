#!/bin/bash

set -e

docker-compose -f docker-compose-dev.yml build pokemonstoragesystem
docker-compose -f docker-compose-dev.yml run pokemonstoragesystem /data/scripts/webpack-compile.sh

