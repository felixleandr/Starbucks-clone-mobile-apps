FROM node:20.8.0

WORKDIR /var/www/services-app

COPY package.json package-lock.json /var/www/services-app

RUN npm install

COPY ./ ./

EXPOSE 4002

CMD ["npm", "run", "start"]