FROM node:20
WORKDIR /usr/src/api
COPY package*.json ./
RUN npm install
COPY . .
COPY /data ./
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]