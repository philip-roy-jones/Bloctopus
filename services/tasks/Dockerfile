FROM node:23-slim

WORKDIR /app

# Copy only the package.json and package-lock.json first
COPY package*.json ./

# Copy the Prisma schema directory
COPY prisma ./prisma

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

# Install dependencies inside the container
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Start the application
CMD ["npm", "run", "dev"]