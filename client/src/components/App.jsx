import React, { useState } from 'react';
import BoxFox from './BoxFox';
import About from './About';

export default function App() {
  const [onApp, setOnApp] = useState(true);

  const switchPage = () => {
    setOnApp(!onApp);
  }

  return (
    <div id='App' >
      {
        onApp ? <BoxFox switchPage={switchPage} /> : <About switchPage={switchPage}/>
      }
    </div>
  );
}
