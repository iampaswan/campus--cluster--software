FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund --fetch-retries=5 --fetch-timeout=120000
COPY . .
ARG VITE_GATEWAY_URL=http://localhost:9000
ENV VITE_GATEWAY_URL=$VITE_GATEWAY_URL
RUN npm run build

FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
