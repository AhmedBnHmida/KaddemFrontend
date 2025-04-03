### Build ###
FROM node:18.17-alpine
WORKDIR /app
COPY package*.json  ./
RUN npm cache clean --force
COPY . .

EXPOSE 4200

RUN npm install --legacy-peer-deps --force 
CMD ["npm","start"]