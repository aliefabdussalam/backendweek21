const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registermodel = require('../model/register.model');
const { success, failed } = require('../helper/respon');

const register = {
  getAllData: (req, res) => {
    try {
      registermodel.getAllData().then((result) => {
        success(res, result, 'success');
      }).catch((err) => {
        failed(res, 404, err);
      });
    } catch (error) {
      console.log(error)
      failed(res, 404, error);
    }
  },
  getlist: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? "" : query.search;
      const field = query.field === undefined ? "id" : query.field;
      const typeSort = query.sort === undefined ? "ASC" : query.sort;
      console.log(search)
      registermodel
          .getlist(search, field, typeSort)
          .then(async (response) => {
              const result = {
                  data: response,
              };
              success(res.status(200), result, "get all users success");
          })
          .catch((err) => {
              console.log(err)
              failed(res.status(401), 401, err);
          });
  } catch (error) {
      
      failed(res.status(401), 401, error);
  }
  },
  getDetails: (req, res) => {
    try {
      const { id } = req.params;
          registermodel
            .getDetails(id)
            .then((result) => {
              success(res, result, 200, "Get Details User Success");
            })
            .catch((err) => {
              failed(res, 404, err);
            }); 
      ;
    } catch (error) {
      failed(res, 404, error);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      bcrypt.hash(body.password, 10, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const data = {
            username: body.username,
            numberPhone: body.numberPhone,
            password: hash,
          };

          registermodel.insert(data).then((result) => {
            success(res, result, 'success');
          }).catch((error) => {
            failed(res, 404, error);
          });
        }
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  update: (req, res) => {
    try {
      const { body } = req;
     
          const data = {
            username: body.username,
            numberPhone: body.numberPhone,
            // password: hash,
            image: req.file.filename,
            displayName: body.displayName,
            bio: body.bio,
            id: req.params.id
          };

          registermodel.update(data).then((result) => {
            success(res, result, 'success');
          }).catch((error) => {
            failed(res, 404, error);
          });
        }
      
     catch (err) {
      failed(res, 401, err);
    }
  },
  login: (req, res) => {
    try {
      const { body } = req;
      console.log(body);
      registermodel.login(body).then((result) => {
        if (result.length <= 0) {
          res.status(404).json('number not found');
        } else {
          const hash = result[0].password;
          bcrypt.compare(body.password, hash, (error, checkpass) => {
            if (error) {
              res.json(error);
            } else if (checkpass === true) {
              const user = result[0];
              const payload = {
                id: user.id,
              };
              const token = jwt.sign(payload, 'secret');
              success(res, result, token);
            } else {
              res.json('password incorrect');
            }
          });
        }
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};
module.exports = register;
