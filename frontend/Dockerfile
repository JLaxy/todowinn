# Use Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (for caching layers)
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Copy the rest of the project
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Run the dev server
# CMD ["npm", "run", "dev"]
CMD ["sleep", "infinity"]