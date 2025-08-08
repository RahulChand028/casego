'use client'
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineDatabase, HiOutlineGlobe } from 'react-icons/hi';
import { Modal, Select, Input, Button } from '../index';
import { showToast } from '@/lib/toast';

interface UpdateIntegrationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: { type: string; database_url: string }) => void;
  data: {
    id: string;
    type: string;
    database_url: string;
  } | null;
  isUpdating: boolean;
}

interface FormData {
  type: string;
  database_url: string;
}

const databaseTypes = [
  { value: 'database', label: 'Database' },
  { value: 'shopify', label: 'Shopify' },
];

const UpdateIntegrationModal: React.FC<UpdateIntegrationModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  data,
  isUpdating,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      type: data?.type ?? 'database',
      database_url: data?.database_url ?? '',
    },
  });

  const watchedType = watch('type');

  useEffect(() => {
    if (data) {
      setValue('type', data.type);
      setValue('database_url', data.database_url);
    }
  }, [data, setValue]);

  const handleFormSubmit = async (formData: FormData) => {
    try {
      await onSubmit({
        type: formData.type,
        database_url: formData.database_url,
      });
      reset();
      onRequestClose();
    } catch (error) {
      showToast.error('Failed to update integration');
    }
  };

  const handleClose = () => {
    reset();
    onRequestClose();
  };

  const getPlaceholder = () => {
    switch (watchedType) {
      case 'database':
        return 'postgresql://username:password@localhost:5432/database_name';
      case 'shopify':
        return 'https://your-store.myshopify.com';
      default:
        return 'Enter database URL';
    }
  };

  const getHelperText = () => {
    switch (watchedType) {
      case 'database':
        return 'Enter your PostgreSQL or MySQL connection string';
      case 'shopify':
        return 'Enter your Shopify store URL';
      default:
        return 'Enter the connection details';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      title="Update Integration"
      size="md"
    >
      <div className="flex items-center gap-2 mb-4">
        <HiOutlineDatabase className="text-xl text-gray-600" />
        <span className="text-sm text-gray-500">
          Update your database or Shopify integration settings
        </span>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Integration Type */}
        <Select
          label="Integration Type"
          options={databaseTypes}
          value={watchedType}
          onChange={(value) => {
            // Update the form value
            const event = { target: { value } };
            register('type').onChange(event);
          }}
          error={errors.type?.message}
          required
        />

        {/* Database URL */}
        <Input
          label="Connection URL"
          placeholder={getPlaceholder()}
          error={errors.database_url?.message}
          helperText={getHelperText()}
          leftIcon={<HiOutlineGlobe className="text-gray-400" />}
          {...register('database_url', {
            required: 'Connection URL is required',
            pattern: {
              value: watchedType === 'database' 
                ? /^(postgresql|mysql):\/\/.+/i
                : /^https?:\/\/.+/i,
              message: watchedType === 'database'
                ? 'Invalid database URL format. Must start with postgresql:// or mysql://'
                : 'Invalid URL format. Must start with http:// or https://',
            },
          })}
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isUpdating}
            className="flex-1"
          >
            {isUpdating ? 'Updating' : 'Update Integration'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateIntegrationModal; 