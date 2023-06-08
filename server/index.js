require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: './server/temp',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));


// REFACTOR ALL OF THE ABOVE LATER
// get list of tables
const { getTableList, getTable, postTable } = require('./model');

app.get('/tables/:table_name', (req, res) => {
  console.log('req is', req);

  const tableName = req.params.table_name;
  const dbInfo = req.query.dbInfo;
  getTable(dbInfo, tableName, (err, result) => {
    if (err) {
      res.sendStatus(500);
      console.log(`error when querying database for ${tableName} table`, err);
    } else {
      res.status(200).send(result);
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

app.post('/tables', upload.single('csvFile'), (req, res) => {
  const fileInfo = req.file;
  const dbInfo = req.query;
  const absPath = path.resolve(__dirname);
  const filePath = path.join(absPath, 'temp', fileInfo.originalname);

  postTable(dbInfo, fileInfo, (err, result) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log('uh oh');
      }
    })

    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost${PORT}`);
});
