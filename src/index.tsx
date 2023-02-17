import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import './index.css';
import {
  RouterProvider,
} from "react-router-dom";
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { Router } from './router/Index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>
);