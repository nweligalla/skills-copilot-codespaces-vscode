// Create web server
// 1. Create a web server
// 2. Handle GET /comments
// 3. Handle POST /comments
// 4. Handle GET /comments/:id
// 5. Handle PUT /comments/:id
// 6. Handle DELETE /comments/:id

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const _ = require('lodash');

// Create web server
const app = express();
app.use(bodyParser.json());

// Handle GET /comments
app.get('/comments', (req, res) => {
    let comments = [];
    try {
        comments = JSON.parse(fs.readFileSync('./comments.json'));
    } catch (e) {
        console.log('Error reading file!');
        console.log(e);
    }
    res.send(comments);
});

// Handle POST /comments
app.post('/comments', (req, res) => {
    let comments = [];
    try {
        comments = JSON.parse(fs.readFileSync('./comments.json'));
    } catch (e) {
        console.log('Error reading file!');
        console.log(e);
    }
    const newComment = req.body;
    newComment.id = comments.length + 1;
    comments.push(newComment);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.send(newComment);
});

// Handle GET /comments/:id
app.get('/comments/:id', (req, res) => {
    let comments = [];
    try {
        comments = JSON.parse(fs.readFileSync('./comments.json'));
    } catch (e) {
        console.log('Error reading file!');
        console.log(e);
    }
    const comment = _.find(comments, (c) => c.id === parseInt(req.params.id));
    res.send(comment);
});

// Handle PUT /comments/:id
app.put('/comments/:id', (req, res) => {
    let comments = [];
    try {
        comments = JSON.parse(fs.readFileSync('./comments.json'));
    } catch (e) {
        console.log('Error reading file!');
        console.log(e);
    }
    const comment = _.find(comments, (c) => c.id === parseInt(req.params.id));
    comment.name = req.body.name;
    comment.content = req.body.content;
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.send(comment);
});

// Handle DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    let comments = [];
    try {
        comments = JSON.parse(fs.readFileSync('./comments.json'));
    } catch (e) {
        console.log('Error reading file!');
        console.log(e);
    }
    _.remove(comments, (c) => c.id === parseInt(req.params.id));
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.send(comments);
});