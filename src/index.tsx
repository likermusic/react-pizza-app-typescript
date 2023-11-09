import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/app.scss';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
// import App1 from './components/App1';
// import AppRouter from './routes/AppRouter';

import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // <Provider store={store}>
  //   <App1 />
  // </Provider>
);
