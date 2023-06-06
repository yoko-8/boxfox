import React, { useState } from 'react';
import axios from 'axios';

export default function Uploader({ tableList, dbInfo }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append('csvFile', selectedFile);

    axios({
      method: 'post',
      url: '/tables',
      params: dbInfo,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(() => {
        console.log('successfully posted to database');
        // input some logic to show that we successfully posted to database
      })
      .catch((err) => {
        console.log('error on posting to database');
        // input some logic that something went wrong
      })
  };

  return (
    <div>
      <form>
        <input type='file' onChange={changeHandler} />
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
      </form>
      <button onClick={handleSubmission}>Submit</button>
    </div>
  )
}