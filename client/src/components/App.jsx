import React, { useState } from 'react';
import axios from 'axios';
import DBInfoEntry from './DBInfoEntry';
import ModeHolder from './ModeHolder';

export default function App() {
  const [dbInfo, setDBInfo] = useState({
    host: '',
    port: '',
    database: '',
    user: '',
    password: '',
  });
  const [tableList, setTableList] = useState([]);
  const [isBoxMode, setBoxMode] = useState(true);

  const findTables = () => {
    axios.get('/tables', {params: { dbInfo }})
      .then((result) => {
        console.log('successfully retrieved table names from db', result.data);
        setTableList(result.data);
      })
      .catch((err) => {
        console.log('error on retrieving table names from db', err);
        // input logic to show that the info input was wrong
      })
  };

  const getTable = (tableName) => {
    axios.get('/tables/' + tableName, {params: { dbInfo }})
      .then(() => {
        // input logic to show that the file has been downloaded into the downloads folder
      })
      .catch((err) => {
        // input logic that something went wrong
      })
  }

  return (
    <div id="App">
      <button onClick={(e) => setBoxMode(!isBoxMode)}>Switch Mode</button>
      <DBInfoEntry dbInfo={dbInfo} setDBInfo={setDBInfo} findTables={findTables} />
      {
        tableList.length ? <ModeHolder isBoxMode={isBoxMode} tableList={tableList} getTable={getTable} dbInfo={dbInfo} /> :
        <div>Waiting For Connection...</div>
      }
    </div>
  );
}
