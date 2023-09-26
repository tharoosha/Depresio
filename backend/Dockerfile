#  Dockerfile for Node Express Backend

FROM node:18

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

# RUN npm install --silent

RUN npm ci
RUN npm rebuild bcrypt --build-from-source

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]