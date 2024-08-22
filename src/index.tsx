import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './store/Store';
import { SocketContextProvider } from './context/socketContext';
import { LoadScript } from '@react-google-maps/api';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
        <LoadScript googleMapsApiKey={`${process.env.REACT_APP_MAPS_KEY}`} >
  <SocketContextProvider>
  <GoogleOAuthProvider clientId='497491388921-al3gve5htq5eud8mod07j6tol11mrcvg.apps.googleusercontent.com'>
             <App />
  </GoogleOAuthProvider>

          </SocketContextProvider>
        </LoadScript>
       </React.StrictMode>
   </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

