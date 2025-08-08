import { toast } from 'sonner';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      description: 'Operation completed successfully',
    });
  },

  error: (message: string) => {
    toast.error(message, {
      description: 'Something went wrong. Please try again.',
    });
  },

  warning: (message: string) => {
    toast.warning(message, {
      description: 'Please check your input and try again.',
    });
  },

  info: (message: string) => {
    toast.info(message, {
      description: 'Here\'s some information for you.',
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      description: 'Please wait while we process your request.',
    });
  },

  dismiss: (toastId: string | number) => {
    toast.dismiss(toastId);
  },

  // Custom toast for specific operations
  phoneAdded: () => {
    toast.success('Phone Number Added', {
      description: 'Your phone number has been added successfully.',
    });
  },

  phoneUpdated: () => {
    toast.success('Phone Number Updated', {
      description: 'Your phone number has been updated successfully.',
    });
  },

  phoneDeleted: () => {
    toast.success('Phone Number Deleted', {
      description: 'Your phone number has been deleted successfully.',
    });
  },

  integrationAdded: () => {
    toast.success('Integration Added', {
      description: 'Your integration has been added successfully with database schema.',
    });
  },

  integrationUpdated: () => {
    toast.success('Integration Updated', {
      description: 'Your integration has been updated successfully with latest schema.',
    });
  },

  integrationDeleted: () => {
    toast.success('Integration Deleted', {
      description: 'Your integration has been deleted successfully.',
    });
  },

  schemaFetched: (tableCount: number) => {
    toast.success('Database Schema Fetched', {
      description: `Successfully connected and fetched ${tableCount} tables from your database.`,
    });
  },

  schemaError: () => {
    toast.error('Database Connection Failed', {
      description: 'Unable to connect to database or fetch schema. Please check your connection string.',
    });
  },

  validationError: (field: string) => {
    toast.error(`Invalid ${field}`, {
      description: `Please check your ${field} and try again.`,
    });
  },

  networkError: () => {
    toast.error('Network Error', {
      description: 'Please check your internet connection and try again.',
    });
  },

  serverError: () => {
    toast.error('Server Error', {
      description: 'Something went wrong on our end. Please try again later.',
    });
  },
}; 