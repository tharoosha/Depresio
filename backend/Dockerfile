#  Dockerfile for Node Express Backend

FROM node:18

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./
RUN npm install

# Install Python and setup virtual environment
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv
RUN python3 -m venv /usr/src/app/venv

# Install Python dependencies
COPY ml_models/requirements.txt .
RUN /usr/src/app/venv/bin/pip install -r requirements.txt


# RUN npm install --silent
RUN npm ci
RUN npm rebuild bcrypt --build-from-source

# Copy app source code
COPY . .

# Exports
EXPOSE 5001

CMD ["npm","start"]