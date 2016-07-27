
# Pokemon Storage System #

## Overview ##

Pokemon Storage System is a webapp that along with the help of mitmproxy intercepts and displays your pokemon. **It cannot and will not send any commands to Niantic servers on your behalf.**

### Screenshots ###

<img src="https://cloud.githubusercontent.com/assets/45194/17179875/01ef7d9e-541b-11e6-81bc-519e832ba230.png" alt="Drawing" width="400" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://cloud.githubusercontent.com/assets/45194/17179876/0225ea5a-541b-11e6-9a6c-168234c17d3a.png" alt="Drawing" width="400" />

## How to get started ##

### Preqrequisites ###

You must have both docker and docker-compose installed. That's it. 

### Installation ###
1. Checkout the repo
2. Optionally, run ```./admin-scripts/generate-mitm-cert.sh``` if you don't want to have to trust new certificates on your phone everytime you restart the container.

### Run it! ###

Run ```docker-compose up -d```

At this point, everything is running, and you should be able to hit the site on port 80. If not, something went wrong and you should back up.

So now we just need to get pokemon into the system. Tell your phone to proxy requests through ```yourserverip:8080``` (don't worry, [we only look at requests to nianticlabs.com](https://github.com/tmalloy/pokemonstoragesystem/blob/master/scripts/start-mitm.sh#L4)). On iPhone this is done in Settings -> Wi-Fi -> Current Wi-Fi network (i) -> Manual (at the bottom)

Once you've conncted to the proxy server, you'll have to add a certificate to your phone to trust mitmproxy to decrypt your traffic. Go to http://mitm.it and install it.

Now make sure to kill the app, then re-launch it and wait for it to fully intialize. Now visit ```yourserverip``` and browse all your pokemon!

## Code Organization ##

### mitmproxy ###

mitmproxy is used for intercepting requests to Niantic's servers

### API ###

A flask-based python app that accepts data from mitmproxy and tries to parse it, then hands out that data to the webapp when asked

### Webapp ###

The webpack/react app that you actually interact with.

## FAQS ##

### Now my phone can't access the internet. ###

Disable the proxy on your phone.

### I don't have docker, can I use Pokemon Storage System without it? ###

You sure can. Take a look at the Dockerfile to see all the dependencies you'll need. Then you can use whatever webserver you like to serve up the webapp and api. 

### Does Pokemon Storage System send any fake data to Niantic servers? ###

Not at all. On launch and ocassionally thereafter the mobile app requests the current player's inventory. All this app does is intercept the response and grab the list of pokemon you own before passing the response on its way. There's no way to use this app to fake your gps location, mass-transfer pokemon, or do anything nefarious.

### Does that mean I won't get banned for using this app? ###

Uncertain, and no promises. You're certainly lower down on their priority list than someone faking their gps location to benefit from ill-gotten pokemon.

### This looks kind of cool, how can I extend it? ###

Thanks very much, you can launch a dev image with ```./admin-scripts/run-dev-image```, fire up a webpack dev server with ```./scripts/webpack-dev-server``` and hack around.
