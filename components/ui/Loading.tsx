'use client'
import React from 'react';
import { componentClasses } from './tokens';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  fullScreen = false,
  text = 'Loading...',
  variant = 'spinner',
  className = '',
}) => {
  const sizeClasses = componentClasses.loading.sizes[size];
  
  const renderSpinner = () => (
    <div className={`${componentClasses.loading.spinner} ${sizeClasses}`} />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      <div className={`${sizeClasses} bg-yellow-500 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
      <div className={`${sizeClasses} bg-yellow-500 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
      <div className={`${sizeClasses} bg-yellow-500 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
    </div>
  );

  const renderPulse = () => (
    <div className={`${sizeClasses} bg-yellow-500 rounded-full animate-pulse`} />
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  const loadingContent = (
    <div className={`relative flex flex-col items-center bg-[#FDFBF7] ${className}`}>
      {renderLoader()}
      {text && (
        <div className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">
          {text}
        </div>
      )}
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