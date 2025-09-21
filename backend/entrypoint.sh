#!/bin/sh
set -e

echo "⏳ Waiting for database..."
until nc -z mysqldb 3306; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "✅ Database is up!"

echo "🚀 Running Prisma migrations..."
npx prisma migrate deploy

echo "⚙️ Generating Prisma client..."
npx prisma generate

echo "🚀 Starting NestJS..."
exec npm run start:prod