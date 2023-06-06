import React from 'react';

export default function DBInfoEntry({dbInfo, setDBInfo, findTables}) {
  const setSingleInfo = (field, value) => setDBInfo({...dbInfo, [field]: value});

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      findTables();
    }}>
      <input
        placeholder='host'
        onChange={(e) => setSingleInfo('host', e.target.value)}
      />
      <input
        placeholder='port'
        onChange={(e) => setSingleInfo('port', e.target.value)}
      />
      <input
        placeholder='database name'
        onChange={(e) => setSingleInfo('database', e.target.value)}
      />
      <input
        placeholder='username'
        onChange={(e) => setSingleInfo('user', e.target.value)}
      />
      <input
        placeholder='password'
        onChange={(e) => setSingleInfo('password', e.target.value)}
      />
      <button type='submit'>Confirm Connection</button>
    </form>
  )
}