FROM node:14

WORKDIR /usr/src/app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
