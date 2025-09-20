# backend/Dockerfile
FROM node:20-alpine

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

WORKDIR /app

# Copy package.json and lock file first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Copy entrypoint script
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3001

# Use entrypoint for migrations + app start
ENTRYPOINT ["./entrypoint.sh"]
