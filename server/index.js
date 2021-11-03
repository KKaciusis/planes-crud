const express = require('express');
const cors = require('cors');
const { request } = require('express');

const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

dotenv.config();

const database = mysql.createPool({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
});

app.post('/api/planes', (request, response) => {

    const QUERY_INSERT = "INSERT INTO planes (from_town, airline, arrival_time, is_late) VALUES (?, ?, ?, ?)";
    const VALUES = [request.body.fromTown, request.body.airline, request.body.arrivalTime, request.body.isLate];
    console.log(request.body)
    
    database.query(QUERY_INSERT, VALUES, (error, result) => {
        console.log(error);
        response.send(result);
})
})

app.get('/api/planes', (request, response) => {
const QUERY_SELECT = "SELECT * FROM planes";

database.query(QUERY_SELECT, (error, result) =>{
    console.log(result);
    response.send(result);
})
});

app.get('/api/planes/totalPlanes', (request, response) => {
const QUERY_SELECT = "SELECT COUNT(id) as totalPlanes FROM planes";

database.query(QUERY_SELECT, (error, result) =>{
    console.log(result);
    response.send(result);
})
});

app.get('/api/planes/status', (request, response) => {
const QUERY_SELECT = "SELECT COUNT(id) AS count, is_late FROM scooters GROUP BY is_late ORDER BY COUNT(id) DESC";

database.query(QUERY_SELECT, (error, result) =>{
    console.log(result);
    response.send(result);
})
});

app.delete("/api/planes/:id", (request, response) => {
const QUERY_DELETE = "DELETE FROM planes WHERE id=" + request.params.id;

database.query(QUERY_DELETE, [], (error, result) => {
    response.send(result);
})
});


app.put('/api/planes:id', (request, response) =>{
const QUERY_UPDATE = "UPDATE planes SET from_town=?, airline=?, arrival_time=?, is_late=? WHERE id="+ request.params.id;
const VALUES = [request.body.fromTown, request.body.airline, request.body.arrivalTime, request.body.isLate];

database.query(QUERY_UPDATE, VALUES, (error, result) => {
    console.log(error);
    response.send(result);
})
});

app.listen(3005, () => {
console.log("Server started");
});