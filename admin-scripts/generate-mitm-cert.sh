#!/bin/bash

docker-compose -f docker-compose-dev.yml build pokemonstoragesystem

# just let mitm run for a couple seconds to generate certs
docker-compose -f docker-compose-dev.yml run pokemonstoragesystem "timeout 3s mitmdump"

