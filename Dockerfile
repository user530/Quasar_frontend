# Build stage
FROM node:current-alpine3.19 as build-stage

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

ARG API_URL_ARG

ENV API_URL $API_URL_ARG

RUN npm run build

RUN npm ci --production && npm cache clean --force

# Production stage
FROM nginx:1.25.4-alpine

COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
