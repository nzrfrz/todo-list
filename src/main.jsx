import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
} from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';
import { GlobalContextProvider } from './Context/GlobalContext';
import { queryClientInstance } from './_services';

import './index.css';
import 'antd/dist/reset.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClientInstance}>
    <GlobalContextProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  </QueryClientProvider>
);
