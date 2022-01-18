const express = require('express');
const {
  insert, login, getAllData, update, getDetails
} = require('../controller/register');
const upload = require('../middleware/upload');



const router = express.Router();
router
  .post('/register', insert)
  .post('/login', login)
  .get('/user', getAllData)
  .get('/user/:id', getDetails)
  .put('/user/:id', upload, update)
module.exports = router;
