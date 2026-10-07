FROM node:20-alpine AS builder

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ARG GOOGLE_CLIENT_CALLBACK_URL
ENV GOOGLE_CLIENT_CALLBACK_URL=$GOOGLE_CLIENT_CALLBACK_URL

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