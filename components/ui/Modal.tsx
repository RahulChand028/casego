'use client'
import React from 'react';
import Modal from 'react-modal';
import { componentClasses } from './tokens';
import { HiOutlineX } from 'react-icons/hi';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  className?: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  const modalClasses = `${componentClasses.modal.content} ${sizeClasses[size]} ${className}`;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      overlayClassName={componentClasses.modal.overlay}
      ariaHideApp={false}
    >
      <div className={modalClasses}>
        {(title || showCloseButton) && (
          <div className={componentClasses.modal.header}>
            {title && (
              <h2 className="text-xl font-semibold text-gray-800">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onRequestClose}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <HiOutlineX className="text-xl" />
              </button>
            )}
          </div>
        )}
        
        <div className={componentClasses.modal.body}>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent; 