import React from 'react';
import Tables from './boxMode/Tables';
import Uploader from './unboxMode/Uploader';

export default function ModeHolder({ isBoxMode, tableList, getTable, dbInfo }) {
  return (
    <div>
      {
        isBoxMode ?
          <Tables tableList={tableList} getTable={getTable} /> :
          <Uploader tableList={tableList} dbInfo={dbInfo} />
      }
    </div>
  )
}