
# NestJS Cat Adoption App
This repository contains a simple NestJS application that provides CRUD operations for a Cat resource.


## Setup Instructions

```bash
$ git clone https://github.com/your-username/nestjs-cats-app.git

$ cd nestjs-cats-app

$ npm install

$ createdb tundrax_cats

$ npm run typeorm migration:run

```

## Running the Application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

```

## Technologies Used
NestJS - A progressive Node.js framework for building efficient, scalable, and maintainable server-side applications.

TypeORM - An ORM for TypeScript and JavaScript (ES5, ES6, ES7, ES8) that supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, SAP Hana, WebSQL databases.

PostgreSQL - A powerful, open source object-relational database system.
Passport.js - A simple, modular authentication library for Node.js.

JWT - JSON Web Tokens are a compact, URL-safe means of representing claims to be transferred between two parties.

Class Validator - A package that provides object schema validation for JavaScript classes.

Class Transformer - A package that provides metadata-based transformation between JavaScript objects and JSON.


## Endpoints

```bash

/auth/register (POST): Register a new user.

/auth/login (POST): Authenticate a user and return a JWT.

/user (POST): Create a new user (admin only).

/user (GET): Retrieve a list of all users.

/user/:id (GET): Retrieve a user profile by ID.

/user/:id (PUT): Update a user profile by ID (admin only).

/user/:id (DELETE): Delete a user profile by ID (admin only).

/cats (POST): Create a new cat profile (admin only).

/cats (GET): Retrieve a list of all cats.

/cats/:id (GET): Retrieve a cat profile by ID.

/cats/:id (PUT): Update a cat profile by ID (admin only).

/cats/:id (DELETE): Delete a cat profile by ID (admin only).

/favorites (POST): Add a cat to favorites (authenticated users only).

/favorites (GET): Retrieve a list of all favorite cats (authenticated users only).

/favorites/:id (DELETE): Remove a cat from favorites (authenticated users only).

```
