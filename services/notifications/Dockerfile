FROM node:22-slim

WORKDIR /app

COPY package*.json ./

# Install Netcat for rabbit initialization check
RUN apt-get update -y && apt-get install -y netcat-openbsd

RUN npm install

COPY . .

# TODO: incorrect production command
CMD ["ts-node", "src/index.ts"]
