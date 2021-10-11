FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install express mysql moment bcryptjs jwt-simple

EXPOSE 3000

CMD ["npm", "run", "start"]


