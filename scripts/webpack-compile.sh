#!/bin/bash

set -e

cd www

echo "Cleaning target folder"
rm -rf target
npm install
env NODE_ENV=production $(npm bin)/webpack --config ./webpack.production.config.js --progress --optimize-minimize

