# Certifyme (backend)

> backend application for the certify me POC

## install

- `npm install`

## make sure environment variables are configured

- refer to file `.env_ex`

- example:
  - DB_HOST=`127.0.0.1`
  - DB_USERNAME=`superuser`
  - DB_PASSWORD=`supersecret`
  - DB_PORT=`8080`
  - DB_NAME=`mydatabase`
  - DB_DIALECT=`mssql | mysql | PostgreSQL`

> for more information on available dialects, check [Sequelize](http://docs.sequelizejs.com/)

## API documentation

- `/api-docs`
- depending on where you are hosting your app, two schemes are provided `http` and `https`
- before working on the checking the documentation, please make sure you update `host` property
- file `/configuration/swagger.json`
- i.e
  - `"host": "nodejs-raven125.c9users.io"`
  - `"host": "localhost"`
  - `"host": "192.168.1.3"`

## Dummy data

- if you need to create (dummy) data, you have the following command available
- _keep in mind this will completely delete the tables along with the information_
- `npm run seed`
- this will generate
  - 15 random users
  - associations between such users
  - 12 random certifications

## Rebase tables content

> If you need to delete existing data so you can start adding your own, the following command is available
> this will delete (and recreate) the existing tables but will NOT add content to them

- `npm run rebase`

## run the application

- `npm start`
