import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './store/Store';
import { SocketContextProvider } from './context/socketContext';

// window.process = {
//   env: {
//     NODE_ENV: process.env.NODE_ENV as 'development' | 'production' || 'development', // Fallback to 'development'
//     PUBLIC_URL: process.env.PUBLIC_URL || '' // Provide a default value if needed
//   }
// };

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
        <React.StrictMode>
          <SocketContextProvider>
             <App />
          </SocketContextProvider>
       </React.StrictMode>
   </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

