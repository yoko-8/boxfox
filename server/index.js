require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));


// REFACTOR ALL OF THE ABOVE LATER
// get list of tables
const { getTableList } = require('./model.js');
app.get('/tables', (req, res) => {
  const dbInfo = req.query.dbInfo;
  // console.log('req is', req.query.dbInfo);
  getTableList(dbInfo, (err, result) => {
    if (err) {
      res.sendStatus(500);
      console.log('error when querying database for table list', err);
    } else {
      res.status(200).send(result);
    }
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost${PORT}`);
});
