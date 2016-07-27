FROM nginx

# nginx image has files in conf.d by default
RUN rm -rf /etc/nginx/conf.d && mkdir -p /etc/nginx/conf.d 

RUN apt-get update && apt-get install -y build-essential python python-dev python-pip protobuf-compiler \
 libffi-dev libssl-dev libxml2-dev libxslt1-dev libjpeg62-turbo-dev zlib1g-dev
RUN pip install --upgrade pip cffi && pip install flask protobuf ipaddress uwsgi mitmproxy


# code and configuration
COPY scripts /data/scripts
COPY api /data/api
COPY mitm /data/mitm
COPY www/target /data/www

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY certs /root/.mitmproxy

WORKDIR /data

ENTRYPOINT ["bash", "/data/scripts/init.sh"]

