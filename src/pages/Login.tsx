import React from "react";
import formatParameter from "utils/formatParameter";

const Login = () => {
  const client_id = "1b916095a0c1419bb00bb1707d87ae5b";
  const scope = "playlist-modify-private";
  const redirect_uri = "http://localhost:3000";

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="container h-full flex-cc mx-auto">
        <div className="flex flex-grow justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full min-h-[525px] h-full bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://source.unsplash.com/K4mSJ7kc0As/600x800'",
              }}
            ></div>
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <form className="px-8 flex-cc flex-col h-full pt-6 pb-8 mb-4 bg-white rounded">
                <h3 className="pt-4 text-2xl mb-8 text-center">
                  Welcome Back!
                </h3>
                <div className="mb-6 w-full flex-cc">
                  <a
                    className="w-full block text-center md:w-4/5 px-4 py-2 font-bold text-white bg-green-500 rounded-full transition-colors hover:bg-green-600 focus:outline-none focus:shadow-outline"
                    href={`https://accounts.spotify.com/authorize?${formatParameter(
                      {
                        response_type: "token",
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
