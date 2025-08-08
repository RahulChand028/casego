'use client'
import React from 'react';
import { componentClasses } from './tokens';

interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  padding = 'md',
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const cardClasses = `${componentClasses.card.base} ${className}`;
  const headerClasses = `${componentClasses.card.header} ${paddingClasses[padding]} ${headerClassName}`;
  const bodyClasses = `${componentClasses.card.body} ${paddingClasses[padding]} ${bodyClassName}`;
  const footerClasses = `${componentClasses.card.footer} ${paddingClasses[padding]} ${footerClassName}`;

  return (
    <div className={cardClasses}>
      {header && (
        <div className={headerClasses}>
          {header}
        </div>
      )}
      
      <div className={bodyClasses}>
        {children}
      </div>
      
      {footer && (
        <div className={footerClasses}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 