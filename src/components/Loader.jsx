import React from 'react';
//JSX element that displays loading
const Loader = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <img src={"http://itunes.apple.com/favicon.ico"} alt="loader" className="w-32 h-32 object-contain" />
    <h1 className="font-bold text-2xl text-white mt-2">{title || 'Loading'}</h1>
  </div>
);

export default Loader;
