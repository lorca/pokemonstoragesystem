#!/bin/bash

set -e

service nginx restart
if [[ "$@" == "" ]]; then
    echo "No command passed, starting bash..."
    bash
else
    echo "Running command: "$@
    $@
fi
