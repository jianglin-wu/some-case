# FROM node:alpine

# WORKDIR /usr/src/app/
# USER root
# COPY package.json ./
# RUN yarn

# COPY ./ ./

# RUN npm run test && npm run build

# ENTRYPOINT ["node", "/usr/src/app/lib/server.js"]


FROM nginx:alpine
COPY ./dist /usr/share/nginx/html
EXPOSE 80
