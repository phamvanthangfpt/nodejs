FROM --platform=linux/amd64 node:18

# configure working directory

WORKDIR /app

COPY package.json .

RUN npm install

# bundle app source code

COPY . ./
EXPOSE 8080
CMD [ "npm", "start" ]