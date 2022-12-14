import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './assets/styles/typography.css';
import './index.css';
import './assets/styles/style.css';
import './assets/styles/sweetalert.mod.defuj.css';
import './assets/styles/navigation.css';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/resto/'>
    {/* <BrowserRouter> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
