import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { StoreProvider } from './context/Store'; // Import the provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the App with the StoreProvider */}
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);