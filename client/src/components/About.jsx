import React from 'react';
import gitHubLogo from '../images/github-mark-white.png';

export default function About({ switchPage }) {
  return (
    <div className='flex justify-center min-h-screen bg-orange-400'>
      <div className='w-1/3'>
        <div className='flex justify-evenly items-end'>
            <h1 className='font-PaletteMosaic text-6xl text-white'>boxfox</h1>
            <button
            className='rounded bg-blue-600 text-white mb-1 w-16 h-8 transform active:scale-95 transition-transform'
            onClick={(e) => switchPage()}
          >
            Back
          </button>
            <a href='https://github.com/yoko-8/boxfox' target='_blank'>
              <img src={gitHubLogo} className='h-10 mb-1 transform active:scale-95 transition-transform' />
            </a>
          </div>
        <div className='mt-8 px-2 py-1 bg-white rounded shadow'>
          <p>
            'boxfox' is a companion app for PostgreSQL databases.<br/>
            <br/>
            It allows users to remotely:<br/>
            1. directly download tables as .csv files from their database, and<br/>
            2. upload .csv files to their database as tables. If a table with the same name as an uploaded .csv file already exists, it will be replaced (NOTE: this feature is in beta - currently, all columns in the newly generated table will be of type TEXT).<br/>
            <br/>
            'boxfox' was created as a failsafe to be used in events when servers go down but users need to urgently access data from their PostgreSQL database. As such, 'boxfox' has been designed to connect to remote PostgreSQL database instances WITHOUT storing your credentials.<br/>
            <br/>
            'boxfox' is open source and was built with PostgreSQL, Express, React, Node.js, and TailwindCSS.<br/>
          </p>
        </div>
      </div>
    </div>
  )
}
