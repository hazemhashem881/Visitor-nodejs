FROM node:alpine
WORKDIR /demo-app
COPY . .
RUN npm install
CMD [ "node","server.js" ]