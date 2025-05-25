# Use an official Node.js runtime as the base image
FROM node:22-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Set path so that the node_modules binaries are available globally
ENV PATH="/app/node_modules/.bin:$PATH"

# Copy the rest of the application code to the working directory
COPY . .

# Command to run the app
# TODO: not correct for production
CMD ["npm", "run", "start"]