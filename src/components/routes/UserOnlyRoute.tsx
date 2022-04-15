import React, { useEffect } from 'react';
import { selectorProps } from 'core/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { deleteAccessToken, updateAccessToken } from 'core/redux/slice';

type Props = {
  children: JSX.Element;
  [key: string]: any;
};

function UserOnlyRoute({ children }: Props) {
  const dispatch = useDispatch();

  const accessTokenFromRedux = useSelector(
    (state: selectorProps) => state.spotify.accessToken
  );

  const accessTokenFromLocalStorage = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessTokenFromLocalStorage)
      dispatch(updateAccessToken(accessTokenFromLocalStorage));
  }, [accessTokenFromLocalStorage, dispatch]);

  useEffect(() => {
    const expireInStr = localStorage.getItem('expiresIn');
    const expireInInt = expireInStr ? parseInt(expireInStr) : null;
    const lastLoginStr = localStorage.getItem('lastLogin');
    const lastLoginInt = lastLoginStr ? parseInt(lastLoginStr) : null;
    let interval: NodeJS.Timer | null = null;

    if (expireInInt && lastLoginInt) {
      const nowInSeconds = new Date().getTime() / 1000;

      const differentBetweenLoginTime = nowInSeconds - lastLoginInt;

      interval = setInterval(() => {
        dispatch(
          deleteAccessToken({
            errors: ['Session is expired please relogin'],
          })
        );
      }, (expireInInt - differentBetweenLoginTime) * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [dispatch]);

  if (!accessTokenFromRedux && !accessTokenFromLocalStorage)
    return <Navigate to="/" />;

  return children;
}

export default UserOnlyRoute;
