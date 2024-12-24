import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'
import woman from '@/assets/images/woman.png'

const Guest = () => {
  return (
    <div className="min-h-screen flex  sm:justify-center items-center pt-6 sm:pt-0 bg-white">
      <div className='rounded-l-lg bg-gray-50 w-full flex'>
        <div className="hidden md:flex w-1/2 justify-center items-center p-8 ">
          <div className='flex flex-col '>
            <img
              src={woman} // Replace with your illustration URL
              alt="Illustration"
              className="w-56 h-auto"
            />
            <NavLink to="/auth/register" className="text-center text-gray-500 mt-4 underline">Create an account</NavLink>
          </div>
        </div>
        <div className="w-1/2 sm:max-w-md mt-6 px-6 py-4 overflow-hidden sm:rounded-lg">
          <Outlet />
        </div>
      </div>

    </div >
  );
};

export default Guest;