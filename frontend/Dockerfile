# Dockerfile for React client

# Build react client
FROM node:18

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

# Clear npm cache
RUN npm cache clean -f

###  Installing dependencies

RUN npm install 

# copy local files to app folder
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]