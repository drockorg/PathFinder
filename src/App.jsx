import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import Routes from "./Routes";
import AppProvider from "./components/AppProvider";
import UIProvider from "./components/UIProvider";
import { ConnectionTest } from "./components/ConnectionTest";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppProvider>
          <UIProvider>
            <ConnectionTest />
            <Routes />
          </UIProvider>
        </AppProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
