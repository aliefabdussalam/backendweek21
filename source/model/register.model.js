const db = require('../config/db');

const registermodel = {
  getAllData: () => new Promise((resolve, reject) => {
    db.query('select * from users', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getlist : (search, field, typeSort) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE username LIKE "%${search}%" ORDER BY ${field} ${typeSort}`,
    (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }),
  getDetails: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }), 
  insert: (data) => new Promise((resolve, reject) => {
    const {
      id, username, numberPhone, password,
    } = data;
    db.query(`insert into users (id,username, number_phone, password) 
    value ("${id}","${username}", "${numberPhone}", "${password}")`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        // eslint-disable-next-line no-shadow
        resolve(result, db.query('select * from users'));
      }
    });
  }),
  login: (body) => new Promise((resolve, reject) => {
    const { numberPhone } = body;
    db.query(`select * from users where number_phone = '${numberPhone}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (data) => new Promise(
    (resolve, reject) => {
      const {
        username, numberPhone, image, displayName, bio, id
      } = data;
      db.query(`update users set username="${username}", image="${image}",number_phone="${numberPhone}", display_name="${displayName}", bio="${bio}" where id="${id}"`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    },
  ),
};
module.exports = registermodel;
