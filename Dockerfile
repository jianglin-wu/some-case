FROM node:alpine

WORKDIR /usr/src/app/
USER root
COPY package.json ./
RUN yarn

COPY ./ ./

RUN npm run test && npm run build

CMD ["node ./lib/server.js"]
