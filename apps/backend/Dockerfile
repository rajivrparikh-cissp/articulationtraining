# Multi-stage production build for ExecutiveVoice Backend
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root workspace configs
COPY package.json turbo.json package-lock.json* ./
COPY packages/ ./packages/
COPY apps/backend/ ./apps/backend/

# Install dependencies and build
RUN npm ci
RUN npx turbo run build --filter=@executive-voice/backend

# Production Runner Stage
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000

# Non-root secure user
USER node

COPY --chown=node:node --from=builder /app/apps/backend/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/apps/backend/package.json ./package.json

EXPOSE 4000

CMD ["node", "dist/server.js"]
