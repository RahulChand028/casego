'use client'
import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  fullScreen = false,
  text = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 border-4',
    md: 'w-16 h-16 border-8',
    lg: 'w-20 h-20 border-8'
  };

  const loadingContent = (
    <div className="relative flex flex-col items-center bg-[#FDFBF7]">
      <div className={`${sizeClasses[size]} border-gray-300 border-t-yellow-500 rounded-full animate-spin`}></div>
      <div className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">
        {text}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFBF7]">
        {loadingContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8 bg-[#FDFBF7]">
      {loadingContent}
    </div>
  );
};

export default Loading;