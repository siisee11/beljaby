# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app/backend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install --silent

EXPOSE 3003

COPY . ./

CMD ["npm", "start"]
