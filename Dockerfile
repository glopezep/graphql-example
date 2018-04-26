FROM node:carbon

WORKDIR /usr/local/src/app

ADD . /usr/local/src/app

RUN npm install --save

EXPOSE 3000

CMD ["npm", "start"]