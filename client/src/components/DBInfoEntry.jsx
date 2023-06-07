import React from 'react';

export default function DBInfoEntry({dbInfo, setDBInfo, findTables}) {
  const setSingleInfo = (field, value) => setDBInfo({...dbInfo, [field]: value});

  return (
    <form className='flex flex-col my-4 px-2 py-1 bg-white rounded shadow' onSubmit={(e) => {
      e.preventDefault();
      findTables();
    }}>
      <div className='flex my-1 justify-between'>
        <input className='w-4/5 rounded shadow bg-neutral-200'
          placeholder='host'
          onChange={(e) => setSingleInfo('host', e.target.value)}
        />
        <input className=' w-1/6 rounded shadow bg-neutral-200'
          placeholder='port'
          onChange={(e) => setSingleInfo('port', e.target.value)}
        />
      </div>
      <input className='my-1 rounded shadow bg-neutral-200'
        placeholder='database name'
        onChange={(e) => setSingleInfo('database', e.target.value)}
      />
      <input className='my-1 rounded shadow bg-neutral-200'
        placeholder='username'
        onChange={(e) => setSingleInfo('user', e.target.value)}
      />
      <input className='my-1 rounded shadow bg-neutral-200'
        placeholder='password'
        onChange={(e) => setSingleInfo('password', e.target.value)}
      />
      <button type='submit' className='my-1 rounded text-white bg-blue-600 h-10 shadow transform active:scale-95 transition-transform'>Test Connection</button>
    </form>
  )
}