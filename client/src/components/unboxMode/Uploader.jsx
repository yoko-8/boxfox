import React, { useState } from 'react';
import axios from 'axios';

export default function Uploader({ tableList }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append('File', selectedFile);
    axios.post('/tables', formData)
      .then(() => {
        console.log('successfully posted to database');
      })
      .catch((err) => {
        console.log('error on posting csv to database', err);
      })
  };

  if (tableList.length) {
    return (
      <div>
        <div>
          <input type='file' name='file' onChange={changeHandler} />
          {isFilePicked ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
          ) : (
            <p>Select a file to show details</p>
          )}
        </div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    )
  } else {
    return (
      <div>Waiting For Connection...</div>
    )
  }
}