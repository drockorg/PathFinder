import React from 'react';

const GhanaFlagAccent = ({ className = '' }) => {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {/* Ghana Flag Colors Accent */}
      <div className="flex space-x-1">
        <div className="w-1 h-8 bg-red-600 rounded-full"></div>
        <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
        <div className="w-1 h-8 bg-green-600 rounded-full"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="flex flex-col space-y-1 ml-2">
        <div className="w-2 h-2 bg-red-600 rounded-full opacity-60"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full opacity-60"></div>
        <div className="w-2 h-2 bg-green-600 rounded-full opacity-60"></div>
      </div>
    </div>
  );
};

export default GhanaFlagAccent;