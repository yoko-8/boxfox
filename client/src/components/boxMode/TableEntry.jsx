import React from 'react';

export default function TableEntry({ tableName, getTable }) {
  return (
    <form className='flex flex-row justify-evenly my-2' onSubmit={(e) => {
      e.preventDefault();
      getTable(tableName);
    }}>
      <div>{tableName}</div>
      <button className='rounded text-white bg-blue-600 w-32 shadow transform active:scale-95 transition-transform' type='submit'>Download CSV</button>
    </form>
  )
}