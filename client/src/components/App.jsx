import React, { useState } from 'react';
import axios from 'axios';
import DBInfoEntry from './DBInfoEntry';

export default function App() {
  const [dbInfo, setDBInfo] = useState({
    host: '',
    port: '',
    database: '',
    user: '',
    password: '',
  });
  const [tableList, setTableList] = useState([]);

  const findTables = () => {
    axios.get('/tables', {params: { dbInfo }})
      .then((result) => {
        console.log('successfully retrieved table names from db', result.data);
        setTableList(result.data);
      })
      .catch((err) => {
        console.log('error on retrieving table names from db', err);
      })
  };

  return (
    <div id="App">
      <DBInfoEntry dbInfo={dbInfo} setDBInfo={setDBInfo} findTables={findTables} />
    </div>
  );
}