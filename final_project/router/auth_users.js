const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
     if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {

    let username= req.body.username;
    let password = req.body.password;
    if( !password || !username){
        return res.status(404).json({ message: "Error logging in" });    }

     if(authenticatedUser(username,password)){
        
     }   

});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
