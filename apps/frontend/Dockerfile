# Frontend Dockerfile
FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

# Dependencies Stage
FROM base AS dependencies
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages ./packages
COPY apps/frontend/package.json ./apps/frontend/

RUN pnpm install --filter @code-slot/frontend...

# Development Stage
FROM base AS development
COPY --from=dependencies /app /app
COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["pnpm", "dev"]

# Production Build Stage
FROM base AS builder
COPY --from=dependencies /app /app
COPY apps/frontend ./apps/frontend
WORKDIR /app/apps/frontend
RUN pnpm build

# Production Static Server Stage
FROM nginx:alpine AS runner
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
