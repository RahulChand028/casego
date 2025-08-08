'use client'
import React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Modal, Button } from '../index';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
  isDeleting?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this item?',
  itemName,
  isDeleting = false,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title={title}
      size="sm"
      showCloseButton={!isDeleting}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-100 rounded-full">
          <HiOutlineExclamationCircle className="text-red-600 text-xl" />
        </div>
        <span className="text-sm text-gray-600">{message}</span>
      </div>

      {itemName && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Item to delete:</span> {itemName}
          </p>
        </div>
      )}

      <p className="text-sm text-red-400 mb-6 font-medium">
        This action cannot be undone.
      </p>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onRequestClose}
          disabled={isDeleting}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleConfirm}
          isLoading={isDeleting}
          className="flex-1"
        >
          {isDeleting ? 'Deleting' : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal; 