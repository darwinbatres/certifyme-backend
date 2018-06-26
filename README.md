# Certifyme (backend)

> backend application for the certify me POC

## install

- `npm install`

## run the application (please make sure the environment variables and further configuration are taken care of)

> the application runs on PM2, the following list of commands are available

- `npm start` this will start the application
- `npm run restart` this will restart the application
- `npm run stop` this will stop the application
- `npm run show` this will show the current status of the application
- `npm run logs` this will show the logs for the application `press ctrl + c to exist this command`
- `npm run monitor` this will open a window where you can monitor the application `press ctrl + c to exist this command`
- `npm run list` this will list the applications you have running <in case you have more than one running on PM2>

---

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

- **NOTE**
- if you need `mysql`,
- you need to also install `mysql2` package

## API documentation

- [api example](https://certifyme.herokuapp.com/api-docs)
- path to the docs: `/api-docs`
- depending on where you are hosting your app, two schemes are provided `http` and `https`
- before working on the checking the documentation, please make sure you update `host` property and `port`
- file `/configuration/swagger.json`
- i.e
  - `"host": "nodejs-raven125.c9users.io:8080"`
  - `"host": "localhost:3000"`
  - `"host": "192.168.1.3:3000"`

## Dummy data

- if you need to create (dummy) data, you have the following command available
- _keep in mind this will completely delete the tables along with the information_
- `npm run seed`
- this will generate
  - 15 random users
  - associations between such users
  - 12 random certifications

## Rebase content <for all tables>

> If you need to delete existing data so you can start adding your own, the following command is available
> this will delete (and recreate) the existing tables but will NOT add content to them

- `npm run rebase`
