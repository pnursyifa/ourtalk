import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/style.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App.jsx';
import store from './states';

import { createTheme, ThemeProvider } from '@mui/material';


const root = createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b',
    },
  },
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
