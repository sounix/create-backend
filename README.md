# create-backend
A CLI built in Node.js, to automate the process of creating a rest api / sockets backend basics


## Features

✓ Support for ¡*MongoDb* and Mysql!

✓ Sequelize(Mysql, Postgre, Microsoft Sql, Mariadb) Support

✓ Mysqlm support (Promise Query Streams)

✓ Morgan logger with log folder

✓ Fully ready-to-use Typescript and Vanilla Javascript support

✓ More than 35 Licenses

✓ Express Ready for Promises (Async / Await)

✓ Module Aliases support

✓ Example Endpoint

✓ Fully configured enviroment variables

✓ Production ready

✓ Bulletproof Folder Structure

## Usage

Use directly with npx (npx comes installed with npm)
```sh
npx create-backend
```
Then you just answer some prompts and *boom!* you got a backend.

## Advanced Usage

###### Command Arguments
Argument | Values | Default | Description
--- | --- | --- | ---
**-y** | *none* | *none* | Skip all prompts
**--name** | :String | 'generated_backend' | Project Name
**--db** | *mysql* or *mariadb* or *mssql* or *postgres* or *mysql_ns* (No Sequelize) | *mysql_ns* (No Sequelize) | Database engine to be used
**--example** | *none* | *none* | Adds an example endpoint
**-ts** | *none* | *none* | Use Typescript instead on Vanilla Javascript
**--aliases** | *none* | *none* | Use Aliases for Modules require's
**--license** | see licenses.js | 'UNLICENSED' | Which license will be used
**--port** | :Number | 3000 | Which license will be used

## Examples

Create project named naza_backend
> $ npx create-backend naza_backend

using typescript
> $ npx create-backend naza_backend -ts

using typescript and postgressql
> $ npx create-backend naza_backend --db=postgres

using javascript and mariadb
> $ npx create-backend naza_backend --db=mariadb


## TODO
1. [ ] Testing (Jest, Mocha)
2. [ ] Microservices (Using cota, not so soon)
3. [ ] Generate backend based on .sql script (model and controllers)
4. [x] MongoDb support
5. [ ] Joi for schema validation (Probably not)
6. [x] Express custom error handling

---
Screenshot:

![Alt text](/ss.png?raw=true "screen")
