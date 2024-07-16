// THIS FILE CONNECTS TO THE THE DATABASE AND EXPORTS IT TO databasepg.js
const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Postgresghil#56",
    database: "milestone_two"
})

client.connect();

module.exports = client;