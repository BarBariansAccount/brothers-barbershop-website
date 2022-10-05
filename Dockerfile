# syntax=docker/dockerfile:1
FROM alpine:3.14

RUN mkdir /barber-website
COPY barber-website/ barber-website/ 

RUN apk update && apk add npm

WORKDIR barber-website/backend/
CMD npm start
