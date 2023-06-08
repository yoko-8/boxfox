const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const homeDirectory = require('os').homedir();

module.exports = {
  getTableList(dbInfo, callback) {
    const client = new Client({
      user: dbInfo.user,
      host: dbInfo.host,
      database: dbInfo.database,
      password: dbInfo.password,
      port: dbInfo.port,
    });
    client.connect((err) => {
      client.query(`SELECT table_name FROM information_schema.tables WHERE table_catalog=$1 AND table_schema='public'`,
      [dbInfo.database],
      (err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res.rows);
        }
        client.end();
      })
    });
  },

  getTable(dbInfo, tableName, callback) {
    const fileName = tableName + '.csv';
    const filePath = path.join(homeDirectory, 'Downloads', fileName);
    const client = new Client({
      user: dbInfo.user,
      host: dbInfo.host,
      database: dbInfo.database,
      password: dbInfo.password,
      port: dbInfo.port,
    });
    client.connect((err) => {
      client.query(`COPY ${tableName} TO '${filePath}' DELIMITER ',' CSV HEADER`,
      (err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
        client.end();
      })
    });
  },

  postTable(dbInfo, fileInfo, callback) {
    const tableName = fileInfo.originalname.slice(0, fileInfo.originalname.length - 4);
    const absPath = path.resolve(__dirname);
    const filePath = path.join(absPath, 'temp', fileInfo.originalname);

    const client = new Client({
      user: dbInfo.user,
      host: dbInfo.host,
      database: dbInfo.database,
      password: dbInfo.password,
      port: dbInfo.port,
    });

    fs.readFile(filePath, 'utf8', (err, res) => {
      if (err) {
        callback(err);
        return;
      } else {
        let rowsArray = res.split('\n');
        let columnsArray = res.split('\n')[0].split(',');
        let createTableQuery = 'CREATE TABLE ' + tableName + ' (id SERIAL UNIQUE PRIMARY KEY, ';

        if (columnsArray[0] !== 'id') {
          callback(err);
          return;
        }

        for (let i = 1; i < columnsArray.length; i++) {
          createTableQuery += columnsArray[i] + ' TEXT';
          if (i !== columnsArray.length - 1) {
            createTableQuery += ', '
          }
        }
        createTableQuery += ')';


        client.connect((err) => {
          client.query(`DROP TABLE IF EXISTS ${tableName}`, (err, res) => {
            if (err) {
              callback(err);
            } else {

              client.query(createTableQuery, (err, res) => {
                if (err) {
                  callback(err);
                } else {

                  let j = 1;
                  function writeDB() {
                    let singlequotified = rowsArray[j].split(',').map((element) => {
                      return "'" + element + "'";
                    }).join(',');
                    let queryString = 'INSERT INTO ' + tableName + ' VALUES (' + singlequotified + ')';

                    console.log(queryString);

                    client.query(queryString, (err, res) => {
                      if (err) {
                        console.log('error happened', err);

                        callback(err);
                      } else {
                        console.log('success!', j);
                        if (j < rowsArray.length - 2) {
                          writeDB(j++);
                        } else {
                          callback(null);
                        }
                      }
                    })
                  }
                  writeDB();


                }
              })

            }
          })

        })


      }
    });

  }
};