#!/bin/sh

# Hold the container open for debugging
# tail -f /dev/null

# Start server (this becomes PID 1)
exec vite dev
