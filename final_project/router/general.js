const express = require('express');
let books = require("./booksdb.js");
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    if(users[req.body.username])
    {
        res.send("The user already exists");
    }
    else 
    {
        if (req.body.username && req.body.password){
        users[req.body.username]=req.body.password;
        res.send("The user" + (' ')+ (req.body.username) + " Has been added!");    
    }
    else
    {
        res.send("The username/password was not provided");
    }
}
});
// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },1000)})
        myPromise.then((successMessage) => {
            res.send(JSON.stringify(books,null,4));
            console.log("From GET books list Callback " + successMessage)
          })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },1000)})
        myPromise.then((successMessage) => {
            const isbn=req.params.isbn;
            res.send(books[isbn]);
            console.log("From GET book details by ISBN Callback " + successMessage)
          })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
const bookkeys=Object.keys(books);
const n=bookkeys.length;
let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },1000)})
    myPromise.then((successMessage) => {
        for(i=0;i<n;i++)
{
    let j=bookkeys[i];
    if(books[j].author==req.params.author)
    {
      res.send(books[j]);
    }
}
        console.log("From GET book by author Callback " + successMessage)
      })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const bookkeys=Object.keys(books);
    const n=bookkeys.length;
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },1000)})
        myPromise.then((successMessage) => {
            for(i=0;i<n;i++)
    {
        let j=bookkeys[i];
        if(books[j].title==req.params.title)
        {
          res.send(books[j]);
        }
    }
            console.log("From GET book by title Callback " + successMessage)
          })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
 res.send(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
