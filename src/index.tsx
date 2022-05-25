import React from 'react';
import ReactDOM from 'react-dom/client';
import Common from '@/config/common'
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@/assets/style/global.less';

async function start() {
  await Common.initialize();

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <App />
  );
}

start().catch(console.error);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
