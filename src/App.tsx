import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreatePlaylist from "pages/CreatePlaylist";
import Login from "pages/Login";
import Error404 from "pages/Error404";
import UserOnlyRoute from "components/routes/UserOnlyRoute";
import GuestOnlyRoute from "components/routes/GuestOnlyRoute";

import { updateAccessToken } from "core/redux/slice";
import { useDispatch } from "react-redux";
import getQueryParams from "utils/getQueryParams";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { access_token = null } = getQueryParams(window.location.hash);
    if (access_token) dispatch(updateAccessToken(access_token));
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <UserOnlyRoute path="/create-playlist" component={CreatePlaylist} />
          <GuestOnlyRoute exact path="/" component={Login} />
          <Route path="*" component={Error404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
