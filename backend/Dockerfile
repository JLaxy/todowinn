# backend/Dockerfile
FROM node:20-alpine

RUN npm install -g @nestjs/cli

WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Default command for development (you can override in docker-compose)
# CMD ["npm", "run", "start:dev"]
CMD ["sleep", "infinity"]