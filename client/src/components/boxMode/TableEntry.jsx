import React from 'react';

export default function TableEntry({ tableName, getTable }) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      getTable(tableName);
    }}>
      <div>{tableName}</div>
      <button type='submit'>Download CSV</button>
    </form>
  )
}