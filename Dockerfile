# Multi-stage production build for ExecutiveVoice on Cloud Run
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./
RUN npm install

# Copy source code and build production Vite bundle
COPY . .
RUN npx vite build

# Production runner stage
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Run as non-root user
USER node

# Copy built artifacts and lightweight production server
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node server.cjs ./server.cjs

EXPOSE 8080

CMD ["node", "server.cjs"]
