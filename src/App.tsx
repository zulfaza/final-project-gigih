import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePlaylist from 'pages/CreatePlaylist';
import Login from 'pages/Login';
import Error404 from 'pages/Error404';
import UserOnlyRoute from 'components/routes/UserOnlyRoute';
import GuestOnlyRoute from 'components/routes/GuestOnlyRoute';
import { Provider } from 'react-redux';
import store from 'core/redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <GuestOnlyRoute>
                  <Login />
                </GuestOnlyRoute>
              }
            />
            <Route
              path="/create-playlist"
              element={
                <UserOnlyRoute>
                  <CreatePlaylist />
                </UserOnlyRoute>
              }
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
