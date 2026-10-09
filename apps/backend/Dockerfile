# ==========================================
# Backend Dockerfile for Node.js LTS
# ==========================================

FROM node:20-alpine AS base

# Install OpenSSL for Prisma and curl for health checks
RUN apk add --no-cache openssl libc6-compat curl

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

# ------------------------------------------
# Dependencies stage
# ------------------------------------------
FROM base AS dependencies

# Copy monorepo workspace manifests
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages ./packages
COPY apps/backend/package.json ./apps/backend/
COPY apps/backend/prisma ./apps/backend/prisma/

# Install backend dependencies within workspace
RUN pnpm install --filter @code-slot/backend...

# Generate Prisma Client
WORKDIR /app/apps/backend
RUN pnpm db:generate

# ------------------------------------------
# Development stage (used for local Docker Compose)
# ------------------------------------------
FROM base AS development

WORKDIR /app
COPY --from=dependencies /app /app
COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

EXPOSE 5000
ENV NODE_ENV=development
ENV PORT=5000
ENV HOST=0.0.0.0

CMD ["pnpm", "dev"]

# ------------------------------------------
# Production build stage
# ------------------------------------------
FROM base AS builder

WORKDIR /app
COPY --from=dependencies /app /app
COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend
RUN pnpm build

# ------------------------------------------
# Production runtime stage
# ------------------------------------------
FROM node:20-alpine AS runner

RUN apk add --no-cache openssl libc6-compat curl
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000
ENV HOST=0.0.0.0

# Security: Run as non-root user
USER node

# Copy built application and workspace modules
COPY --chown=node:node --from=builder /app /app

WORKDIR /app/apps/backend

EXPOSE 5000

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

CMD ["node", "dist/server.js"]
