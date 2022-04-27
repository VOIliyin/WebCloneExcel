FROM node

WORKDIR /app

COPY package.json /app

RUN npm i

COPY . .

ENV PORT 3000

EXPOSE $PORT

CMD ["npm", "start"]