# Step 1: Build static react app
FROM node:18-alpine AS builder
LABEL authors="amnon"

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.25.4-alpine-slim

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
