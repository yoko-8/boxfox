import React from 'react';

export default function DBInfoEntry({dbInfo, setDBInfo, findTables}) {
  const setSingleInfo = (field, value) => setDBInfo({...dbInfo, [field]: value});

  return (
    <form className='flex flex-col my-4 p-2 bg-neutral-300 rounded' onSubmit={(e) => {
      e.preventDefault();
      findTables();
    }}>
      <div className='flex my-1 justify-between'>
        <input className='w-4/5 rounded'
          placeholder='host'
          onChange={(e) => setSingleInfo('host', e.target.value)}
        />
        <input className=' w-1/6 rounded'
          placeholder='port'
          onChange={(e) => setSingleInfo('port', e.target.value)}
        />
      </div>
      <input className='my-1 rounded'
        placeholder='database name'
        onChange={(e) => setSingleInfo('database', e.target.value)}
      />
      <input className='my-1 rounded'
        placeholder='username'
        onChange={(e) => setSingleInfo('user', e.target.value)}
      />
      <input className='my-1 rounded'
        placeholder='password'
        onChange={(e) => setSingleInfo('password', e.target.value)}
      />
      <button type='submit' className='my-1'>Test Connection</button>
    </form>
  )
}