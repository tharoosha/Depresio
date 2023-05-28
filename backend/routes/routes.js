const express = require('express');

const router = express.Router()

module.exports = router;

// endpoints

//Post Method
router.post('/post', (req, res) => {
    res.send('Post API')
})

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})



// importing model
const Model = require('../models/model');

// create the data body to post
router.post('/post', (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
})