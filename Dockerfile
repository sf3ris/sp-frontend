FROM node:14.10

WORKDIR /app/app

COPY ./app/package.json /app/app/package.json

RUN yarn install

#CMD [ "yarn", "start" ]
