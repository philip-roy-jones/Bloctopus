FROM node:22-slim

WORKDIR /app

# Copy only the package.json and package-lock.json first
COPY package*.json ./

# Copy the Prisma schema directory
COPY prisma ./prisma

# Install OpenSSL for Prisma & netcat for database connection initialization check
RUN apt-get update -y && apt-get install -y openssl netcat-openbsd

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application files
COPY . .

# Start the application
# TODO: npm script no longer exists (using npm messes up PID within container), must build and start here
CMD ["npm", "run", "start"]