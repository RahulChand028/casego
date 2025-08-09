'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineDatabase, HiOutlineGlobe } from 'react-icons/hi';
import { Modal, Select, Input, Button } from '../index';
import { showToast } from '@/lib/toast';

interface AddIntegrationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: { type: string; database_url: string }) => void;
  availableTypes?: Array<'database' | 'shopify'>;
}

interface FormData {
  type: string;
  database_url: string;
}

const allTypes = [
  { value: 'database', label: 'Database' },
  { value: 'shopify', label: 'Shopify' },
];

const AddIntegrationModal: React.FC<AddIntegrationModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  availableTypes,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      type: 'database',
      database_url: '',
    },
  });

  const watchedType = watch('type');

  const filteredTypeOptions = (availableTypes && availableTypes.length > 0)
    ? allTypes.filter((t) => availableTypes.includes(t.value as 'database' | 'shopify'))
    : allTypes;

  // Ensure default type aligns with availableTypes whenever modal opens
  React.useEffect(() => {
    if (!isOpen) return;
    const nextType = (availableTypes && availableTypes.length > 0)
      ? availableTypes[0]
      : 'database';
    setValue('type', nextType);
    setValue('database_url', '');
  }, [isOpen, availableTypes, setValue]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSubmit({
        type: data.type,
        database_url: data.database_url,
      });
      reset();
      onRequestClose();
    } catch (error) {
      showToast.error('Failed to add integration');
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
      title="Add Integration"
      size="md"
    >
      <div className="flex items-center gap-2 mb-4">
        <HiOutlineDatabase className="text-xl text-gray-600" />
        <span className="text-sm text-gray-500">
          Configure your database or Shopify integration
        </span>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Integration Type */}
        <Select
          label="Integration Type"
          options={filteredTypeOptions}
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
            isLoading={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Adding' : 'Add Integration'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddIntegrationModal; 