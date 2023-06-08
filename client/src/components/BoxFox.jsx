import React, { useState } from 'react';
import axios from 'axios';
import DBInfoEntry from './DBInfoEntry';
import ModeHolder from './ModeHolder';
import boxfox from '../images/boxfoxLogo.png';
import unboxfox from '../images/unboxfoxLogo.png';
import gitHubLogo from '../images/github-mark-white.png';

export default function BoxFox({ switchPage }) {
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
      .then((result) => {
        const data = result.data;

        // Create a Blob object from the CSV string
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Create a link element for downloading
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Cleanup by revoking the URL and removing the link element
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((err) => {
        // input logic that something went wrong
        console.log('error on retrieving table from db', err);
      })
  }

  return (
    <div className='flex justify-center min-h-screen bg-orange-400'>
      <div className='w-1/3'>

        <div className='flex justify-evenly items-end'>
          <h1 className='font-PaletteMosaic text-6xl text-white'>boxfox</h1>
          <button
            className='rounded bg-blue-600 text-white mb-1 w-16 h-8 transform active:scale-95 transition-transform'
            onClick={(e) => switchPage()}
          >
            About
          </button>
          <a href='https://github.com/yoko-8/boxfox' target='_blank'>
            <img src={gitHubLogo} className='h-10 mb-1 transform active:scale-95 transition-transform' />
          </a>
        </div>

        <div className='flex justify-center max-h-72'>
          {
            isBoxMode ? <img src={boxfox} alt='boxfox logo' className='object-scale-down' /> :
            <img src={unboxfox} alt='unboxfox logo' className='object-scale-down' />
          }
        </div>
        <button
          className='w-full rounded text-white bg-blue-600 h-10 shadow transform active:scale-95 transition-transform'
          onClick={(e) => setBoxMode(!isBoxMode)}
        >Switch Mode</button>
        <DBInfoEntry dbInfo={dbInfo} setDBInfo={setDBInfo} findTables={findTables} />
        <div className='p-2 bg-white rounded shadow'>
        {
          tableList.length ? <ModeHolder isBoxMode={isBoxMode} tableList={tableList} getTable={getTable} dbInfo={dbInfo} /> :
          <div className='flex justify-center'>{status}</div>
        }
        </div>
      </div>
    </div>
  );
}
