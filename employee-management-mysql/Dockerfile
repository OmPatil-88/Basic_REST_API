FROM node:16.14.0

WORKDIR D:\Rest API\employee-management-mysql

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "myapp.js"]
