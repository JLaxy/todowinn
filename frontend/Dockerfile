# frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build   # 👉 creates `.next` production build

# Production image
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --production --frozen-lockfile

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./ 

EXPOSE 3000
CMD ["npm", "run", "start"]   # production server
