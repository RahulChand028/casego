"use client";

import { authClient } from "@/common/clientAuth";
import { useState, useEffect } from "react";
import { User } from "better-auth";
import { showToast } from "@/lib/toast";
import { 
  Sidebar, 
  Loading, 
  Card, 
  Button, 
  AddIntegrationModal, 
  UpdateIntegrationModal, 
  DeleteConfirmModal 
} from '@/components/ui';
import { 
  HiOutlinePlus, 
  HiOutlineDatabase, 
  HiOutlinePencil, 
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineGlobe
} from 'react-icons/hi';

interface Integration {
  id: string;
  userId: string;
  type: 'database' | 'shopify';
  database_url: string;
  db_schema?: string;
  valid: boolean;
  createdAt: string;
  updatedAt: string;
}

const Integration = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoadingIntegrations, setIsLoadingIntegrations] = useState(true);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  
  // Loading states
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser(session.data.user);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchIntegrations();
    }
  }, [user]);

  const fetchIntegrations = async () => {
    try {
      setIsLoadingIntegrations(true);
      const response = await fetch('/api/user/integration');
      if (response.ok) {
        const data = await response.json();
        setIntegrations(data.integrations);
      } else {
        console.error('Failed to fetch integrations');
      }
    } catch (error) {
      console.error('Error fetching integrations:', error);
    } finally {
      setIsLoadingIntegrations(false);
    }
  };

  const handleAddIntegration = async (data: { type: string; database_url: string }) => {
    try {
      setIsAdding(true);
      const response = await fetch('/api/user/integration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setIntegrations(prev => [...prev, result.integration]);
        setIsAddModalOpen(false);
        
        // Show appropriate toast based on integration type and validation
        if (result.integration.type === 'database') {
          if (result.integration.valid && result.integration.db_schema) {
            const schema = JSON.parse(result.integration.db_schema);
            showToast.schemaFetched(schema.total_tables);
          } else {
            showToast.schemaError();
          }
        } else {
          showToast.integrationAdded();
        }
      } else {
        const error = await response.json();
        showToast.error(error.error || 'Failed to add integration');
      }
    } catch (error) {
      console.error('Error adding integration:', error);
      showToast.error('Failed to add integration');
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateIntegration = async (data: { type: string; database_url: string }) => {
    if (!selectedIntegration) return;

    try {
      setIsUpdating(true);
      const response = await fetch(`/api/user/integration/${selectedIntegration.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Fetch the updated integration to get the latest data
        const updatedResponse = await fetch('/api/user/integration');
        if (updatedResponse.ok) {
          const data = await updatedResponse.json();
          const updatedIntegration = data.integrations.find((i: Integration) => i.id === selectedIntegration.id);
          
          setIntegrations(prev => 
            prev.map(integration => 
              integration.id === selectedIntegration.id 
                ? updatedIntegration
                : integration
            )
          );
        }
        
        setIsUpdateModalOpen(false);
        setSelectedIntegration(null);
        
        // Show appropriate toast based on integration type and validation
        if (data.type === 'database') {
          // We'll need to check the updated integration data
          const updatedIntegration = integrations.find(i => i.id === selectedIntegration.id);
          if (updatedIntegration?.valid && updatedIntegration?.db_schema) {
            const schema = JSON.parse(updatedIntegration.db_schema);
            showToast.schemaFetched(schema.total_tables);
          } else {
            showToast.schemaError();
          }
        } else {
          showToast.integrationUpdated();
        }
      } else {
        const error = await response.json();
        showToast.error(error.error || 'Failed to update integration');
      }
    } catch (error) {
      console.error('Error updating integration:', error);
      showToast.error('Failed to update integration');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteIntegration = async () => {
    if (!selectedIntegration) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/user/integration/${selectedIntegration.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setIntegrations(prev => prev.filter(integration => integration.id !== selectedIntegration.id));
        setIsDeleteModalOpen(false);
        setSelectedIntegration(null);
        showToast.integrationDeleted();
      } else {
        const error = await response.json();
        showToast.error(error.error || 'Failed to delete integration');
      }
    } catch (error) {
      console.error('Error deleting integration:', error);
      showToast.error('Failed to delete integration');
    } finally {
      setIsDeleting(false);
    }
  };

  const openUpdateModal = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsDeleteModalOpen(true);
  };

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case 'database':
        return <HiOutlineDatabase className="text-xl" />;
      case 'shopify':
        return <HiOutlineGlobe className="text-xl" />;
      default:
        return <HiOutlineDatabase className="text-xl" />;
    }
  };

  const getIntegrationTypeLabel = (type: string) => {
    switch (type) {
      case 'database':
        return 'Database';
      case 'shopify':
        return 'Shopify';
      default:
        return type;
    }
  };

  const maskDatabaseUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const protocol = urlObj.protocol;
      const host = urlObj.host;
      const pathname = urlObj.pathname;
      
      // Mask username and password
      const maskedUrl = `${protocol}//***:***@${host}${pathname}`;
      return maskedUrl;
    } catch {
      // If URL parsing fails, return a masked version
      return url.replace(/\/\/[^@]+@/, '//***:***@');
    }
  };

  if (isLoading) {
    return <Loading fullScreen={true} size="md" text="Loading Integration" />;
  }

  return (
    <div className="min-h-screen font-sans pt-8 md:pt-24">
      <div className="flex gap-6 flex-col md:flex-row">
        <Sidebar user={user} activeLink='integration' />
        
        <div className="flex-1 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
                <p className="text-gray-600 mt-2">
                  Manage your database and Shopify integrations
                </p>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                leftIcon={<HiOutlinePlus />}
                disabled={integrations.length >= 2}
              >
                Add Integration
              </Button>
            </div>

            {/* Integration Limit Warning */}
            {integrations.length >= 2 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                <p className="text-yellow-800 text-sm">
                  You have reached the maximum limit of 2 integrations. Please delete an existing integration to add a new one.
                </p>
              </div>
            )}

            {/* Loading State */}
            {isLoadingIntegrations ? (
              <div className="flex justify-center py-12">
                <Loading size="md" text="Loading integrations..." />
              </div>
            ) : (
              <>
                {/* Empty State */}
                {integrations.length === 0 ? (
                  <Card className="text-center py-12">
                    <HiOutlineDatabase className="text-4xl text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No integrations yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Add your first database or Shopify integration to get started.
                    </p>
                    <Button
                      onClick={() => setIsAddModalOpen(true)}
                      leftIcon={<HiOutlinePlus />}
                    >
                      Add Your First Integration
                    </Button>
                  </Card>
                ) : (
                  /* Integration List */
                  <div className="space-y-2">
                    {integrations.map((integration) => (
                      <Card key={integration.id} className="p-2 w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getIntegrationIcon(integration.type)}
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {getIntegrationTypeLabel(integration.type)}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {integration.valid ? 'Connected' : 'Not connected'}
                              </p>
                            </div>
                            <div className="flex items-start gap-1">
                            {integration.valid ? (
                              <HiOutlineCheckCircle className="text-green-500 text-xl" />
                            ) : (
                              <HiOutlineXCircle className="text-red-500 text-xl" />
                            )}
                          </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              iconOnly
                              aria-label="Edit integration"
                              title="Edit"
                              onClick={() => openUpdateModal(integration)}
                              leftIcon={<HiOutlinePencil className="text-base" />}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              iconOnly
                              aria-label="Delete integration"
                              title="Delete"
                              onClick={() => openDeleteModal(integration)}
                              leftIcon={<HiOutlineTrash className="text-base text-red-600" />}
                            />
                          </div>
                          
                        </div>           
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddIntegrationModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddIntegration}
        availableTypes={(function(){
          const hasDb = integrations.some((i) => i.type === 'database');
          const hasShopify = integrations.some((i) => i.type === 'shopify');
          if (hasDb && hasShopify) return [] as Array<'database'|'shopify'>; // none
          if (hasDb) return ['shopify'] as Array<'database'|'shopify'>;
          if (hasShopify) return ['database'] as Array<'database'|'shopify'>;
          return ['database', 'shopify'] as Array<'database'|'shopify'>;
        })()}
      />

      <UpdateIntegrationModal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedIntegration(null);
        }}
        onSubmit={handleUpdateIntegration}
        data={selectedIntegration}
        isUpdating={isUpdating}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedIntegration(null);
        }}
        onConfirm={handleDeleteIntegration}
        title="Delete Integration"
        message="Are you sure you want to delete this integration? This action cannot be undone."
        itemName={selectedIntegration ? `${getIntegrationTypeLabel(selectedIntegration.type)} integration` : undefined}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Integration;