# MegaCorp Game

A web application that allows users to run a galactic megacorporation.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

1. Clone this repository.
2. Run 'npm install' to install dependencies.
3. Make sure MongoDB is running, run 'mongod' if not.
4. Initialize database by running 'node server.js --setup'
4. FUTURE: Run 'node buildPack.js' to build the index.js file from es6.
5. FUTURE: Host by running 'node server.js --serve'
6. FUTURE: Site is now running at localhost:8081
7. FUTURE: To clean the database, shutdown server.js and run 'node server.js --clean'

### Prerequisites

You will need to have Node.js and npm installed.
You will also need MongoDB installed.
Everything else can be installed using npm(See Getting Started).

## Running the tests

To run the automated unit testing, do the following:

1. Make sure MongoDB is running, run 'mongod' if not.
2. Make sure site is running, run 'node server.js --serve' if not.
3. FUTURE: Run the database tests with the following command, 'mocha -t 100000 testDB.js'
4. FUTURE: Run the endpoint tests with the following command, 'mocha -t 100000 testEndpoints.js'

## Built With

* [Node.js](https://nodejs.org/en/) - Back end framework
* [MongoDB](https://www.mongodb.com/) - NoSQL data store

## Authors

* **Dilan Jenkins** - *Initial work* - [djenkins1](https://github.com/djenkins1)

