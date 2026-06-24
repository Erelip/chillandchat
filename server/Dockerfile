FROM node:20-alpine AS builder

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src/infrastructure/persistence ./src/infrastructure/persistence
COPY prisma.config.ts ./

RUN npx prisma generate

COPY . .
RUN npm run build


FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/infrastructure/persistence ./src/infrastructure/persistence
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]