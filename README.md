# Library Instruction Statistics Database

## Environment

Server: node v10.16.3
Client: node v10.16.3
        jspm v0.16.45

## Deploy app

### Database - mongodb

1. install mongodb
2. Create database (db-schema.js)
3. Add env variables (server/.env)
DB_HOST={mongodb host}
DB_PORT={port 27017}
DB_NAME={lisd db name}

### Client

#### Configuration

client/config/configuration.js

#### Build

cd client
npm install
jspm install

##### Minify public files

1. from client/, run "gulp minify-all"
2. Copy all files from dist/src to the corresponding locations in src/

### Server

#### Configuration

No configuration needed before deployment

##### App settings

server/config/settings.js

#### Build

cd server
npm install

## Start app

node lisd-server.js

