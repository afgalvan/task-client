FROM node:14.17-stretch-slim

WORKDIR /app

COPY ./package.json yarn.lock ./

RUN yarn

COPY . .
