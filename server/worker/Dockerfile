FROM node:20-alpine3.19

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn global add typescript

RUN yarn build

CMD ["yarn", "start"]