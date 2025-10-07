import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import Routes from "./Routes";
import AppProvider from "./components/AppProvider";
import UIProvider from "./components/UIProvider";
import { ConnectionTest } from "./components/ConnectionTest";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <LanguageProvider>
            <AppProvider>
              <UIProvider>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
                <ConnectionTest />
                <Routes />
              </UIProvider>
            </AppProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
