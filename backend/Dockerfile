FROM node:19.0.0-slim

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev", "-- --host"]
