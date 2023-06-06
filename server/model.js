const { Client } = require('pg');
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
  }
};