FROM node:16.14.0

WORKDIR E:\iauro\Rest API\Docker\employee-management-mysql\employee-management-mysql

COPY package*.json ./

RUN  npm install

COPY . .

EXPOSE 3000

CMD ["node", "myapp.js"]
