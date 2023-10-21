# Build stage
FROM node:20.3-alpine as build-stage

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:1.17.5-alpine

COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
