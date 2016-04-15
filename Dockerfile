FROM node:5.8.0

CMD npm start

ADD ./ /app
WORKDIR /app

RUN adduser dev
RUN chown dev:dev -R /app

USER dev
RUN npm install

VOLUME /app/node_modules