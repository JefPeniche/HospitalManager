FROM node:14

WORKDIR /usr/src/app

RUN npm install

RUN npm install express mysql moment bcryptjs jwt-simple dotenv

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
