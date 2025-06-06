FROM nginx:1.28.0-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d /etc/nginx/conf.d
COPY wait-for-services.sh /wait-for-services.sh

RUN chmod +x /wait-for-services.sh && \
    apk add --no-cache netcat-openbsd