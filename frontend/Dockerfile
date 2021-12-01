FROM node:lts-alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration=production

#stage 2
FROM caddy/caddy:2.4.5-alpine
COPY --from=node /app/dist/frontend /srv
EXPOSE 80
