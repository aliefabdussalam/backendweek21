const express = require('express');
const {
  insert, login, getAllData, update, getDetails, getlist
} = require('../controller/register');
const upload = require('../middleware/upload');



const router = express.Router();
router
  .post('/register', insert)
  .post('/login', login)
  .get('/user', getlist)
  .get('/user/:id', getDetails)
  .put('/user/:id', upload, update)
module.exports = router;
