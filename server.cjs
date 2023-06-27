/* eslint-disable no-undef */
const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 
// lets us do process.env (get variables from .env file)
const { getFruits } = require('./Controllers/fruits.js');

const Fruit = require('./Models/Fruit.js');
const  Veggie  = require('./Models/Veggie.js');
// now I can use process.env.VARIABLE_NAME
// when my server starts, I want to connect to my database
require('./config/database.js')


const app = express();
app.use(express.json());

// GET DATA
app.get('/fruits', getFruits);

// CREATE DATA
app.post('/fruits', async (req, res) => {
    console.log(req.body);
    let databaseResponse = await Fruit.create(req.body);
    res.send(databaseResponse)
});

// UPDATE DATA
app.put('/fruits/:idOfFruit/:newName', async (req, res) => {
    // step 1 - get information from request (params, queries, req.body)
    const idOfFruit = req.params.idOfFruit;
    const newName= req.params.newName;
    // step 2 use information to make an update request to collection
    let databaseResponse = await Fruit.findByIdAndUpdate(idOfFruit, {name: newName})
    res.send(databaseResponse)
})

// DELETE DATA
app.delete('/fruits/:idOfFruit', async (req, res) => {
    const idOfFruit = req.params.idOfFruit;
    let databaseResponse = await Fruit.findByIdAndDelete(idOfFruit)
    res.send(databaseResponse)
})

//'/create_veggie' - this route will get information from the front end and create a new Veggie in the collection

app.post('/create_veggie', async (req, res) => {
    
    let databaseResponse = await Veggie.create(req.body);
    res.send(databaseResponse)
});

//'/veggies' - this route will get all Veggie objects from the database and send them to the front end

app.get('/veggies', async (req, res) =>{
    let response = await Veggie.find()
    res.send(response)
})

//'/veggie/:veggieName'  (optional)- this route will take the veggieName and get that specific veggie from the database and send it to the front end to be displayed

app.get('/veggie/:veggieName', async (req, res) =>{
    let veggieByName = req.params.veggieName
    let response = await Veggie.find({name: veggieByName})
    res.send(response)
})








app.listen(4001, () => {
    console.log("listening on 4001")
})

