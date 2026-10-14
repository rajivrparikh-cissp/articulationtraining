FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

USER node

COPY --chown=node:node dist ./dist
COPY --chown=node:node server.cjs ./server.cjs

EXPOSE 8080

CMD ["node", "server.cjs"]
