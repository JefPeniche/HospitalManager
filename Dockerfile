FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN cp .env.example .env

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
