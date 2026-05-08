# ─────────────────────────────────────────────────────────────────────────────
# Fyneo — NestJS Backend
# Two-stage build: builder compiles TS → dist/, runner runs prod node_modules.
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1 · builder ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./

# Install ALL deps (dev included — @nestjs/cli needed for nest build)
# --ignore-engines: safety net for any engine version mismatches
# --cache-folder:   use /app/.yarn-cache (same layer) to avoid CI I/O errors on /tmp
RUN mkdir -p /app/.yarn-cache && \
    yarn install \
      --frozen-lockfile \
      --ignore-engines \
      --network-timeout 300000 \
      --cache-folder /app/.yarn-cache \
 && rm -rf /app/.yarn-cache

# Copy source after install — maximises layer cache reuse
COPY . .

# Compile TypeScript → dist/
RUN yarn build


# ── Stage 2 · runner ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

LABEL maintainer="fyneo"
LABEL description="Fyneo NestJS backend"

RUN apk add --no-cache libc6-compat

# Non-root user
RUN addgroup --system --gid 1001 nestjs \
 && adduser  --system --uid 1001 --ingroup nestjs nestjs

WORKDIR /app

ENV NODE_ENV=production

# Production-only deps with isolated cache
COPY --chown=nestjs:nestjs package.json yarn.lock ./
RUN mkdir -p /app/.yarn-cache && \
    yarn install \
      --frozen-lockfile \
      --production \
      --ignore-engines \
      --network-timeout 300000 \
      --cache-folder /app/.yarn-cache \
 && rm -rf /app/.yarn-cache

# Compiled output
COPY --from=builder --chown=nestjs:nestjs /app/dist ./dist

# NestJS CLI config (needed for module resolution at runtime)
COPY --chown=nestjs:nestjs nest-cli.json ./

USER nestjs

EXPOSE 4000

CMD ["node", "dist/main"]
