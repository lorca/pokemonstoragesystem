#!/bin/bash

set -e

service nginx restart
if [[ "$@" == "" ]]; then
    echo "No command passed, starting mitm & uwsgi..."
    bash /data/scripts/start-mitm.sh &
    bash /data/scripts/start-uwsgi.sh ; fg
else
    echo "Running command: "$@
    $@
fi
