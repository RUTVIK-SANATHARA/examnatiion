import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



// store.subscribe(()=>{
//   console.log(store.getState());
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
);
