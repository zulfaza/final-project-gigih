import React, { useEffect } from 'react';
import formatParameter from 'utils/formatParameter';
import { deleteAccessToken, updateAccessToken } from 'core/redux/slice';
import { useDispatch } from 'react-redux';
import getQueryParams from 'utils/getQueryParams';
import Lottie from 'components/lottie';
import music from 'components/lottie/animations/sound-equalizer-bars-music.json';

export type QueryType = {
  access_token: string;
  expires_in: string;
  token_type?: string;
  last_login: string;
};

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    function checkAccessTokenFromSpotify() {
      const data = getQueryParams(window.location.hash);

      if (data.access_token) {
        const lastLoginInSeconds = new Date().getTime() / 1000 - 60;
        const dataToSave = {
          ...data,
          last_login: lastLoginInSeconds.toString(),
        } as QueryType;

        dispatch(updateAccessToken(dataToSave));

        return true;
      }

      return false;
    }

    function CheckAccessTokenFromLocalStorage() {
      const accessToken = localStorage.getItem('accessToken');
      const expireInStr = localStorage.getItem('expiresIn');
      const expireInInt = expireInStr ? parseInt(expireInStr) : null;
      const lastLoginStr = localStorage.getItem('lastLogin');
      const lastLoginInt = lastLoginStr ? parseInt(lastLoginStr) : null;
      const nowInSeconds = new Date().getTime() / 1000;
      if (lastLoginInt && expireInInt && accessToken) {
        if (nowInSeconds > lastLoginInt + expireInInt) {
          dispatch(deleteAccessToken());
        } else {
          dispatch(
            updateAccessToken({
              access_token: accessToken,
              expires_in: expireInInt.toString(),
              last_login: lastLoginInt.toString(),
            })
          );
        }
      }
    }

    if (!checkAccessTokenFromSpotify()) CheckAccessTokenFromLocalStorage();
  }, [dispatch]);

  const client_id = '1b916095a0c1419bb00bb1707d87ae5b';
  const scope =
    'playlist-modify-private  user-read-private  user-read-email  streaming';
  const redirect_uri = 'http://localhost:3000';

  return (
    <div className="w-full h-screen bg-gray-900">
      <div className="container h-full flex-cc mx-auto">
        <div className="flex flex-grow justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full min-h-[525px] h-full bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://source.unsplash.com/QzpgqElvSiA/600x800'",
              }}
            ></div>
            <div className="w-full lg:w-1/2 text-gray-200 bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <form className="px-8 flex-cc flex-col h-full pt-6 pb-8 mb-4 rounded">
                <Lottie animation={music} />
                <h3 className="pt-4 text-2xl mb-8 text-white text-center">
                  Welcome Back!
                </h3>
                <div className="mb-6 w-full flex-cc">
                  <a
                    className="w-full block text-center md:w-4/5 px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:rounded-2xl transition-all hover:bg-green-600 focus:outline-none focus:shadow-outline"
                    href={`https://accounts.spotify.com/authorize?${formatParameter(
                      {
                        response_type: 'token',
                        client_id,
                        scope,
                        redirect_uri,
                      }
                    )}`}
                  >
                    Sign In
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
