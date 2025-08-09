'use client'
import React from 'react';
import { componentClasses } from './tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = componentClasses.button.base;
  const variantClasses = componentClasses.button[variant];
  const sizeClasses = componentClasses.button.sizes[size];

  const iconOnlySizeClasses = size === 'lg' ? 'p-3' : size === 'sm' ? 'p-1.5' : 'p-2';

  const classes = `${baseClasses} ${variantClasses} ${iconOnly ? iconOnlySizeClasses : sizeClasses} ${
    disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      )}
      {!isLoading && iconOnly ? (
        <>{leftIcon}</>
      ) : (
        <>
          {!isLoading && leftIcon && (
            <span className="mr-2">{leftIcon}</span>
          )}
          {children}
          {!isLoading && rightIcon && (
            <span className="ml-2">{rightIcon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button; 