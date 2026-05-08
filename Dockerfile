# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — builder: install deps + compile TypeScript
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy manifests first — layer cache friendly
COPY package.json yarn.lock ./

# Install ALL deps (dev included — needed for nest build / tsc)
RUN yarn install --frozen-lockfile

# Copy source (node_modules excluded via .dockerignore)
COPY . .

# Compile: nest build → dist/
RUN yarn build


# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — runner: lean production image
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

LABEL maintainer="fyneo"
LABEL description="Fyneo NestJS backend"

RUN apk add --no-cache libc6-compat

# Non-root user
RUN addgroup --system --gid 1001 nestjs \
 && adduser  --system --uid 1001 --ingroup nestjs nestjs

WORKDIR /app

ENV NODE_ENV=production

# Install production-only dependencies
COPY --chown=nestjs:nestjs package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production \
 && yarn cache clean

# Copy compiled output from builder
COPY --from=builder --chown=nestjs:nestjs /app/dist ./dist

# Copy NestJS CLI config (needed for module resolution at runtime)
COPY --chown=nestjs:nestjs nest-cli.json ./

USER nestjs

# Backend listens on 4000 by default (main.ts → process.env.PORT ?? 4000)
EXPOSE 4000

CMD ["node", "dist/main"]
