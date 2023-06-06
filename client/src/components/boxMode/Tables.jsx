import React from 'react';
import TableEntry from './TableEntry';

export default function Tables({ tableList, getTable }) {
  return (
    <div>
      {
        tableList.map((table) => {
          const tableName = table.table_name;
          return <TableEntry tableName={tableName} key={tableName} getTable={getTable} />
        })
      }
    </div>
  )
}