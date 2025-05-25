#!/bin/sh

# Wait for the DB
until nc -z auth-database 3306; do
  echo "Waiting for auth-database..."; sleep 1;
done

# Run Prisma commands
npx prisma generate
npx prisma migrate deploy

# Start server (this becomes PID 1)
exec node node_modules/nodemon/bin/nodemon.js \
  --legacy-watch \
  --watch src \
  --ext ts,json \
  --exec "tsx src/index.ts"
