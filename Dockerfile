FROM node:12.16.3-slim

WORKDIR /app

COPY ./ /app/

RUN yarn
