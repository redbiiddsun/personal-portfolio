# Build the static site, then serve it with nginx. nginx also does what vercel.json does
# in production: the /api rewrite, the security headers and clean URLs.
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Baked into the bundle at build time (the admin shows it as the OAuth callback URL).
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN [ -n "$VITE_API_URL" ] || { echo "VITE_API_URL build arg is required"; exit 1; }
RUN npm run build

FROM nginx:1.27-alpine
# nginx's entrypoint runs envsubst over templates/, so API_URL is read at container start.
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/build /usr/share/nginx/html
