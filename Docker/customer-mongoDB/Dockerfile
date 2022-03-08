FROM node:16.14.0

WORKDIR D:\Rest API\customer-list

COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "mongodb.js"]
