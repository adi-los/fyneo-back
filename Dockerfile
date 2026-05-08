# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — deps: install ALL dependencies (prod + dev) for the build step
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS deps

# Required for native addons (e.g. bcryptjs, pg)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy only manifests first → layer-cache friendly
COPY package.json yarn.lock ./

# Install all deps (dev included — needed for nest build / tsc)
RUN yarn install --frozen-lockfile


# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — builder: compile TypeScript → dist/
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Bring in all node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the full source (tsconfig, nest-cli.json, src/, etc.)
COPY . .

# Build: nest build uses tsconfig.build.json → outputs to ./dist
RUN yarn build


# ─────────────────────────────────────────────────────────────────────────────
# Stage 3 — runner: lean production image
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

LABEL maintainer="fyneo"
LABEL description="Fyneo NestJS backend"

RUN apk add --no-cache libc6-compat

# Run as non-root for security
RUN addgroup --system --gid 1001 nestjs \
 && adduser  --system --uid 1001 --ingroup nestjs nestjs

WORKDIR /app

ENV NODE_ENV=production

# Install ONLY production dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production \
 && yarn cache clean

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Copy nest-cli.json (needed by some runtime path resolutions)
COPY nest-cli.json ./

# Ownership
RUN chown -R nestjs:nestjs /app

USER nestjs

# Backend listens on 4000 by default (see main.ts → process.env.PORT ?? 4000)
EXPOSE 4000

# Use node directly — fastest startup, no unnecessary nest overhead in prod
CMD ["node", "dist/main"]
