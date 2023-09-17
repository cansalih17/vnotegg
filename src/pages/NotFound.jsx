import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="mt-52">
        <div className="container mx-auto text-center">
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Sayfa Bulunamadı</h2>
        <p className="text-gray-600 mb-4">Aradığınız sayfa maalesef bulunamadı.</p>
        <Link to="/"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Ana Sayfa'ya Dön
        </Link>
      </div>
      </div>
    </div>
  );
};

export default NotFound;
