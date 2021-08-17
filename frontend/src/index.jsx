import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

if (undefined /* [snowpack] import.meta.hot */ ) {
   undefined /* [snowpack] import.meta.hot */ .accept(({module}) => {
     // Accept the module, apply it into your application.
   });
 }
{/* <img src={logo} className="App-logo" alt="logo" /> */}