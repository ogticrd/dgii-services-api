#####################################
##           Dependencies          ##
#####################################
FROM node:lts-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

#####################################
##               Build             ##
#####################################
FROM node:lts-alpine AS builder

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-production}

WORKDIR /app


COPY . .

COPY --from=deps /app/node_modules ./node_modules


RUN npm run build

#####################################
##               Release           ##
#####################################
FROM node:lts-alpine AS release

RUN apk add --no-cache dumb-init

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-production}
ENV PORT=80
ENV HOST=0.0.0.0

WORKDIR /app

USER node

COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

COPY --from=deps /app/node_modules ./node_modules

EXPOSE ${PORT}

CMD ["dumb-init", "node", "dist/main.js"]