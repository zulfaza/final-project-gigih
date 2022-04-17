import store from 'core/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
}

export default AppProviders;
