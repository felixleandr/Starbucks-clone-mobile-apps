FROM node:18.17.0

WORKDIR /var/www/orchestrator

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 4000

CMD ["npm", "run", "start"]