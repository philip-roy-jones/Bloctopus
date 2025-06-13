FROM kong:3.6

COPY plugins /usr/local/share/lua/5.1/kong/plugins

ENV KONG_PLUGINS=bundled,jwt-payload-header
