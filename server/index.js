require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));


// REFACTOR ALL OF THE ABOVE LATER
// get list of tables
const { getTableList, getTable } = require('./model');

app.get('/tables/:table_name', (req, res) => {
  console.log('req is', req);

  const tableName = req.params.table_name;
  const dbInfo = req.query.dbInfo;
  getTable(dbInfo, tableName, (err, result) => {
    if (err) {
      res.sendStatus(500);
      console.log(`error when querying database for ${tableName} table`, err);
    } else {
      res.sendStatus(200);
    }
  });
})

app.get('/tables', (req, res) => {
  const dbInfo = req.query.dbInfo;
  getTableList(dbInfo, (err, result) => {
    if (err) {
      res.sendStatus(500);
      console.log('error when querying database for table list', err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/tables', (req, res) => {
  // const file = req.body;
  // console.log('file is', file);
  console.log(req.body);
  console.log(req.query);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost${PORT}`);
});
