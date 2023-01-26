# Installer
FROM node:18-alpine AS installer
ENV NEXT_STANDALONE=true

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN apk add --no-cache git libc6-compat
RUN apk update
RUN yarn install --frozen-lockfile
RUN yarn build

# Runner
FROM node:18-alpine AS runner

RUN apk add --no-cache git libc6-compat
RUN apk update
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir -p /app
WORKDIR /app

COPY --from=installer --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static
COPY --from=installer --chown=nextjs:nodejs /usr/src/app/public ./public

USER nextjs
HEALTHCHECK --interval=3s --timeout=1s --retries=5 CMD nc -vz localhost 3000 || exit 1
EXPOSE 3000
CMD node server.js
