#!/bin/sh

SERVICES="web-app:5173 auth-service:1111 tasks-service:2222"

for SERVICE in $SERVICES; do
  HOST=$(echo "$SERVICE" | cut -d':' -f1)
  PORT=$(echo "$SERVICE" | cut -d':' -f2)

  echo "Waiting for $HOST:$PORT..."
  while ! nc -z "$HOST" "$PORT"; do
    sleep 1
  done
  echo "$HOST:$PORT is up"
done

echo "All services ready. Starting Nginx..."
exec nginx -g "daemon off;"
