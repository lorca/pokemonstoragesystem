#!/bin/bash

set -e

./scripts/start-uwsgi.sh &

cd www
./node_modules/.bin/webpack-dev-server; fg
