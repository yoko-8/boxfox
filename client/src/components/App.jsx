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
  const [status, setStatus] = useState('Not Connected Yet.');

  const findTables = () => {
    setStatus('Connecting...');

    axios.get('/tables', {params: { dbInfo }})
      .then((result) => {
        console.log('successfully retrieved table names from db', result.data);
        setStatus('Connected!');
        setTableList(result.data);
      })
      .catch((err) => {
        console.log('error on retrieving table names from db', err);
        setStatus('Could not connect. Check credentials.')
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
    <div id='App' className='flex justify-center h-screen bg-orange-400'>
      <div className='w-1/3'>
        <button className='w-full mt-4 rounded text-white bg-blue-600 h-10 shadow transform active:scale-95 transition-transform' onClick={(e) => setBoxMode(!isBoxMode)}>Switch Mode</button>
        <DBInfoEntry dbInfo={dbInfo} setDBInfo={setDBInfo} findTables={findTables} />
        <div className='flex justify-center p-2 bg-white rounded shadow'>
        {
          tableList.length ? <ModeHolder isBoxMode={isBoxMode} tableList={tableList} getTable={getTable} dbInfo={dbInfo} /> :
          <div>{status}</div>
        }
        </div>
      </div>
    </div>
  );
}
