FROM node:16.14.0

WORKDIR D:\Rest API\Docker\customer-mongoDB

COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "mongodb.js"]
