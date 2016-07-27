#!/bin/bash

# ignore all non-nianticlabs urls
mitmdump -p 8080 -s /data/mitm/mitmscript.py --ignore '^(?!(.+\.)?nianticlabs\.com)'

