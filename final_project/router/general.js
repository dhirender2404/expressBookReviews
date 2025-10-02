const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');
 


// Register new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if username already exists
  if (isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // Save the user
  users.push({ username, password });

  return res.status(201).json({ message: "User registered successfully" });
});




// -------------------- ORIGINAL IMPLEMENTATION --------------------
// Get the book list available in the shop (synchronous)
public_users.get('/', function (req, res) {
    if (books && Object.keys(books).length > 0) {
        return res.status(200).json(books);
    } else {
        return res.status(404).json({ message: "No data" });
    }
});

// -------------------- TASK 10: PROMISE CALLBACK --------------------
// Get the book list using Promises (Axios + .then/.catch)
public_users.get('/promise', function (req, res) {
    axios.get('http://localhost:6000/')
        .then(response => {
            return res.status(200).json(response.data);
        })
        .catch(err => {
            return res.status(500).json({ message: "Error fetching books", error: err.message });
        });
});

// -------------------- TASK 10: ASYNC/AWAIT --------------------
// Get the book list using async-await (Axios)
public_users.get('/async', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:6000/');
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching books", error: err.message });
    }
});


// -------------------- ORIGINAL IMPLEMENTATION --------------------
// Get book details based on ISBN (synchronous)
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;   // get isbn from request params

    if (books[isbn]) {
        // ISBN exists in books
        res.status(200).json(books[isbn]);
    } else {
        // ISBN not found
        res.status(404).json({ message: "Book not found with given ISBN" });
    }
});

// -------------------- TASK 11: PROMISE CALLBACK --------------------
// Get book details using Promises (Axios + .then/.catch)
public_users.get('/promise/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    axios.get(`http://localhost:6000/isbn/${isbn}`)
        .then(response => {
            return res.status(200).json(response.data);
        })
        .catch(err => {
            return res.status(500).json({ message: "Error fetching book by ISBN", error: err.message });
        });
});

// -------------------- TASK 11: ASYNC/AWAIT --------------------
// Get book details using async-await (Axios)
public_users.get('/async/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const response = await axios.get(`http://localhost:6000/isbn/${isbn}`);
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching book by ISBN", error: err.message });
    }
});

  

// -------------------- ORIGINAL IMPLEMENTATION --------------------
// Get book details based on author (synchronous)
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();

    // filter all books where author matches
    const result = Object.values(books).filter(
        book => book.author.toLowerCase() === author
    );

    if (result.length > 0) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ message: "No books found for this author" });
    }
});

// -------------------- TASK 12: PROMISE CALLBACK --------------------
// Get book details by author using Promises (Axios + .then/.catch)
public_users.get('/promise/author/:author', function (req, res) {
    const author = req.params.author;
    axios.get(`http://localhost:6000/author/${author}`)
        .then(response => {
            return res.status(200).json(response.data);
        })
        .catch(err => {
            return res.status(500).json({ message: "Error fetching books by author", error: err.message });
        });
});

// -------------------- TASK 12: ASYNC/AWAIT --------------------
// Get book details by author using async-await (Axios)
public_users.get('/async/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const response = await axios.get(`http://localhost:6000/author/${author}`);
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching books by author", error: err.message });
    }
});



//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  // check if isbn exists in books
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "No review found for this ISBN" });
  }
});


// -------------------- ORIGINAL SYNCHRONOUS --------------------
// Get all books based on title (synchronous)
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();

    const result = Object.values(books).filter(
        book => book.title.toLowerCase() === title
    );

    if (result.length > 0) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ message: "No books found for this title" });
    }
});

// -------------------- PROMISE CALLBACK --------------------
// Get book details by title using Promises (Axios + .then/.catch)
public_users.get('/promise/title/:title', function (req, res) {
    const title = req.params.title;
    axios.get(`http://localhost:6000/title/${title}`)
        .then(response => {
            return res.status(200).json(response.data);
        })
        .catch(err => {
            return res.status(500).json({ message: "Error fetching books by title", error: err.message });
        });
});

// -------------------- ASYNC/AWAIT --------------------
// Get book details by title using async-await (Axios)
public_users.get('/async/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const response = await axios.get(`http://localhost:6000/title/${title}`);
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching books by title", error: err.message });
    }
});


module.exports.general = public_users;
