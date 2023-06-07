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
        <p>Hi This is a neat project</p>
      </div>
    </div>
  )
}
