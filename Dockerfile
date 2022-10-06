# syntax=docker/dockerfile:1
FROM alpine:3.14

RUN apk update && apk add npm

RUN mkdir /barber-website
COPY barber-website/ barber-website/ 
WORKDIR barber-website/backend/

RUN npm install express nodemon

ENV PORT=8080
EXPOSE 8080/tcp
CMD npm start
