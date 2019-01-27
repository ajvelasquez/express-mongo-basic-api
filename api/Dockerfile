FROM node

WORKDIR /app/api

RUN npm i -g nodemon

COPY ./src ./src

EXPOSE 3000

CMD ['nodemon', './src/index.js']