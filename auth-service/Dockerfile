FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install \
    && npm install typescript -g

COPY . .

RUN tsc

EXPOSE 3000

CMD ["npm", "start"]