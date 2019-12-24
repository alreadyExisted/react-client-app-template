FROM node:12.14.0-alpine AS build
WORKDIR /app

COPY ./package*.json ./
RUN npm install --ignore-scripts

COPY ./src ./src
COPY ./views ./views
COPY ./tsconfig.json ./webpack.config.js ./

RUN npm run build

FROM nginx:1.17.6-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /app/dist .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker-entrypoint.sh /etc

CMD /bin/sh /etc/docker-entrypoint.sh && nginx -g "daemon off;"