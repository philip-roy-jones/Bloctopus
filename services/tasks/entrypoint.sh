#!/bin/sh

# Wait for the DB
until nc -z tasks-database 3306; do
  echo "Waiting for tasks-database..."; sleep 1;
done

# Run Prisma commands
npx prisma generate
npx prisma migrate deploy

# Hold the container open for debugging
# tail -f /dev/null

# Start server (this becomes PID 1)
exec node node_modules/nodemon/bin/nodemon.js \
  --legacy-watch \
  --watch src \
  --ext ts,json \
  --exec "tsx src/index.ts"
