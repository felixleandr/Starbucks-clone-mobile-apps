FROM node:18.17.0

WORKDIR /var/www/services-user

COPY package.json package-lock.json /var/www/services-user

RUN npm install

COPY ./ ./

EXPOSE 4001

CMD ["npm", "run", "start"]