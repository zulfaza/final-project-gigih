import React from "react";
import { selectorProps } from "core/redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
  [key: string]: any;
};

function GuestOnlyRoute({ children }: Props) {
  const accessToken = useSelector<selectorProps>(
    (state) => state.spotify.accessToken
  );

  if (accessToken) return <Navigate to="/create-playlist" />;

  return children;
}

export default GuestOnlyRoute;
