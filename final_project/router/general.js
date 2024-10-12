const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {

    let userName = req.body.username;
    let password = req.body.password;
    if(userName && password){
        if (!doesExist(userName)){
        users.push({"userName" : userName , "password": password})
        return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
    return res.status(404).json({message: "User already exists!"});
    }   }
    return res.status(404).json({message: "Unable to register user."});
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

        res.send(JSON.stringify(books));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let iban  = req.params.isbn;
    
    return res.send(JSON.stringify(books[iban]));
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

    let author = req.params.author;
    var size = Object.keys(books).length;
    for(let i =1;i<=size;i++){
        if(books[i].author==author){
            return res.send(JSON.stringify(books[i]))
        } 
    }
    return res.status(403).json({ message: "Not found" });


});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

    let title = req.params.title;
    var size = Object.keys(books).length;
    for(let i=1;i<=size;i++){
        if(books[i].title==title){
            return res.send(JSON.stringify(books[i]))
        }
    }
    return res.status(403).json({ message: "Not found" });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {

    let isbn = req.params.isbn;
    if(books[isbn]){
        return res.send(books[isbn].reviews)
    }else 
    return res.status(403).json({ message: "Not found" });

});

module.exports.general = public_users;
