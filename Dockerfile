FROM node:10
WORKDIR /app
RUN npm install
COPY . /app
CMD npm run setUpDB
CMD npm run start 
EXPOSE 8080
