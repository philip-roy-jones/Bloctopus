#!/bin/sh

# Wait for rabbitmq
until nc -z rabbitmq 5672; do
  echo "Waiting for rabbitmq..."; sleep 1;
done

# Start server (this becomes PID 1)
exec node node_modules/nodemon/bin/nodemon.js \
  --legacy-watch \
  --watch src \
  --ext ts,json \
  --exec "tsx src/index.ts"
