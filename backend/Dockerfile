# backend/Dockerfile
FROM node:20-alpine

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

WORKDIR /app

# Copy package.json and lock file first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Build the NestJS app (creates dist/)
RUN npm run build

# Copy entrypoint script
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3001

# Use entrypoint for DB migrations + app start
ENTRYPOINT ["./entrypoint.sh"]
