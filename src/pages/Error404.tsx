import Lottie from 'components/lottie';
import React from 'react';
import { erro404 } from 'components/lottie/animations';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="w-full h-screen">
      <div className="container h-full flex-cc mx-auto">
        <div className="flex flex-grow justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full py-10 text-gray-200 bg-dark-600 p-5 rounded-xl">
              <div className=" -mt-10">
                <Lottie className="h-125" animation={erro404} />
              </div>
              <div className="flex-cc w-full">
                <Link
                  className="text-white px-4 py-2 bg-green-500 rounded-full hover:rounded-2xl transition-all hover:bg-green-600 focus:outline-none focus:shadow-outline"
                  to="/"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
