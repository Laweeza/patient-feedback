FROM node:14.18.1

RUN mkdir app
COPY . /app/

WORKDIR /app/
RUN npm install

CMD ["npm", "start"]