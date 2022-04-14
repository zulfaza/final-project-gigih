import React from "react";
import { selectorProps } from "core/redux/store";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

interface Props {
  component: any;
  [key: string]: any;
}

export default function UserOnlyRoute({
  component: Component,
  ...rest
}: Props) {
  const accessToken = useSelector<selectorProps>(
    (state) => state.spotify.accessToken
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        return accessToken ? <Component {...props} /> : <Redirect to={"/"} />;
      }}
    ></Route>
  );
}
