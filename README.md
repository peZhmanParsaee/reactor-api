# Reactor API

Reactor is a super tiny invoice management application. This code repository is its `API` source code which has been developed by [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/). Moreover, there is a Web UI for this application which is located in [Reactor Web UI Repository](https://github.com/pezhmanparsaee/reactor-web-ui)

## Popular NPM Dependencies

* express
* mongodb
* moment-jalaali
* mocha

## Prerequisites

* Install Node.js >= 8.9.3 and MongoDB > 4 on your machine
* Run `npm insatll` in your cli in the root of project to install dependencies
* Make a copy of `.env.sample` and name it `.env`. You must set the environemt variables on it.
* Run `npm run populate-db` to make structure and default data in the db

## How To Run in Development Mode

* Run `npm run dev`

## How To Run in Production Mode

* Run `npm start`

## Available Scripts

In the project folder, you can run these shell commands:

### `npm install`
It installs all npm modules that are required for running the application.

### `npm run dev`
It runs the project in development watch mode.

### `npm run lint`
It runs eslint to check if there is any coding error/warning.

### `npm test`
It runs unit tests and show the result in the CLI.

### `npm start`
It runs a node web server that serves the output and responds to HTTP requests. It is proper to run the project in production mode.
