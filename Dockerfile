# syntax=docker.io/docker/dockerfile:1

# FROM --platform=linux/amd64 node:18-alpine AS base

# # Install dependencies only when needed
# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# # Install dependencies based on the preferred package manager
# COPY package.json pnpm-lock.yaml* .npmrc* ./
# RUN corepack enable pnpm && pnpm i --frozen-lockfile


# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .


# ENV NEXT_TELEMETRY_DISABLED=1

# COPY .env .env

# RUN corepack enable pnpm && pnpm run build

# FROM base AS runner
# WORKDIR /app


# ENV NODE_ENV=production \
#     NEXT_TELEMETRY_DISABLED=1 

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# ENV PORT=3000

# ENV HOSTNAME="0.0.0.0"
# CMD ["node", "server.js"]


# Stage 1: Runner
FROM node:18 AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the build output and public files from the GitHub Action
COPY ./public ./public
COPY ./.next/standalone ./.next/standalone
COPY ./.next/static ./.next/static

# Switch to the non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run the application (Next.js app will be served)
CMD ["node", "server.js"]
