# backend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build   # compiles TS → dist/

# Production image
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/main.js"]
