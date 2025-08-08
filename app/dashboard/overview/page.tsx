"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/common/clientAuth";
import { User } from "better-auth";
import { showToast } from "@/lib/toast";
import { 
  HiOutlineCheckCircle, 
  HiOutlineXCircle, 
  HiOutlinePencil, 
  HiOutlineTrash,
  HiOutlinePhone,
  HiOutlinePlus,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineDatabase
} from 'react-icons/hi';

import { 
  Sidebar, 
  Loading, 
  Card, 
  Button, 
  AddPhoneModal, 
  UpdatePhoneModal, 
  DeleteConfirmModal 
} from '@/components/ui';

type PhoneNumber = {
  id: string;
  country_code: string;
  phone_number: string;
  valid: boolean;
  createdAt: string;
}

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [loadingPhones, setLoadingPhones] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState<PhoneNumber | null>(null);

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
    fetchPhoneNumbers();
  }, []);

  const fetchPhoneNumbers = async () => {
    try {
      setLoadingPhones(true);
      const response = await fetch('/api/user/phone');
      const data = await response.json();

      if (response.ok) {
        setPhoneNumbers(data.phoneNumbers || []);
      }
    } catch (error) {
      console.error('Error fetching phone numbers:', error);
    } finally {
      setLoadingPhones(false);
    }
  };

  const handleAddPhone = async (data: { countryCode: string, phoneNumber: string }) => {
    try {
      const response = await fetch('/api/user/phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: data.phoneNumber,
          country_code: data.countryCode
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to add phone number');
      }

      fetchPhoneNumbers();
      setIsModalOpen(false);
      showToast.phoneAdded();

    } catch (error) {
      console.error('Error adding phone number:', error);
      showToast.error('Failed to add phone number');
    }
  };

  const handleEditPhone = (phone: PhoneNumber) => {
    setIsUpdateModalOpen(true);
    setSelectedPhone(phone);
  };

  const handleDeletePhone = (phone: PhoneNumber) => {
    setSelectedPhone(phone);
    setDeleteModalOpen(true);
  };

  const confirmDeletePhone = async () => {
    if (!selectedPhone) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/user/phone/${selectedPhone.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPhoneNumbers();
        setDeleteModalOpen(false);
        setSelectedPhone(null);
        showToast.phoneDeleted();
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete phone number');
      }
    } catch (error) {
      console.error('Error deleting phone number:', error);
      showToast.error('Failed to delete phone number');
    } finally {
      setIsDeleting(false);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedPhone(null);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedPhone(null);
  };

  const updatePhone = async (data: { countryCode: string, phoneNumber: string }) => {
    if (!selectedPhone) return;

    setIsUpdating(true);

    try {
      const response = await fetch(`/api/user/phone/${selectedPhone.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: data.phoneNumber,
          country_code: data.countryCode
        }),
      });

      if (response.ok) {
        fetchPhoneNumbers();
        setIsUpdateModalOpen(false);
        setSelectedPhone(null);
        showToast.phoneUpdated();
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update phone number');
      }
    } catch (error) {
      console.error('Error updating phone number:', error);
      showToast.error('Failed to update phone number');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (valid: boolean) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        valid 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {valid ? 'Verified' : 'Unverified'}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <Loading fullScreen={true} size="md" text="Loading Dashboard" />;
  }

  return (
    <div className="min-h-screen font-sans pt-8 md:pt-24">
      <div className="flex gap-6 flex-col md:flex-row">
        <Sidebar user={user} activeLink='overview' />
        
        <div className="flex-1 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {user?.name}! Manage your phone numbers and integrations.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <HiOutlinePhone className="text-blue-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Phone Numbers</p>
                    <p className="text-2xl font-bold text-gray-900">{phoneNumbers.length}/5</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <HiOutlineCheckCircle className="text-green-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Verified</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {phoneNumbers.filter(phone => phone.valid).length}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <HiOutlineUser className="text-yellow-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Account</p>
                    <p className="text-2xl font-bold text-gray-900">Active</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Phone Numbers Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Phone Numbers</h2>
                  <p className="text-gray-600 text-sm">
                    Manage your phone numbers for WhatsApp notifications
                  </p>
                </div>
                <Button
                  onClick={openModal}
                  leftIcon={<HiOutlinePlus />}
                  disabled={phoneNumbers.length >= 5}
                >
                  Add Phone Number
                </Button>
              </div>

              {/* Phone Limit Warning */}
              {phoneNumbers.length >= 5 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                  <p className="text-yellow-800 text-sm">
                    You have reached the maximum limit of 5 phone numbers. Please delete an existing number to add a new one.
                  </p>
                </div>
              )}

              {/* Loading State */}
              {loadingPhones ? (
                <div className="flex justify-center py-12">
                  <Loading size="md" text="Loading phone numbers..." />
                </div>
              ) : (
                <>
                  {/* Empty State */}
                  {phoneNumbers.length === 0 ? (
                    <Card className="text-center py-12">
                      <HiOutlinePhone className="text-4xl text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Enable Report Delivery & AI Chat
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Add your phone number to receive automated reports and chat with our AI agent directly via WhatsApp.
                      </p>
                      <Button
                        onClick={openModal}
                        leftIcon={<HiOutlinePlus />}
                      >
                        Add Your First Phone Number
                      </Button>
                    </Card>
                  ) : (
                    /* Phone Numbers List */
                    <div className="space-y-4">
                      {phoneNumbers.map((phone) => (
                        <Card key={phone.id} className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                {phone.valid ? (
                                  <HiOutlineCheckCircle className="text-green-500 text-xl" />
                                ) : (
                                  <HiOutlineXCircle className="text-red-500 text-xl" />
                                )}
                                <span className="text-gray-900 font-medium">
                                  {phone.country_code} {phone.phone_number}
                                </span>
                              </div>
                              {getStatusBadge(phone.valid)}
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <HiOutlineCalendar className="text-gray-400" />
                                <span className="hidden sm:inline">Added:</span>
                                <span>{formatDate(phone.createdAt)}</span>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleEditPhone(phone)}
                                  leftIcon={<HiOutlinePencil />}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDeletePhone(phone)}
                                  leftIcon={<HiOutlineTrash />}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-500">
                          {phoneNumbers.length} of 5 phone numbers added
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  variant="secondary"
                  onClick={() => window.location.href = '/dashboard/integration'}
                  className="justify-start"
                >
                  <HiOutlineDatabase className="mr-2" />
                  Manage Integrations
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => window.location.href = '/dashboard/setting'}
                  className="justify-start"
                >
                  <HiOutlineUser className="mr-2" />
                  Account Settings
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => window.location.href = '/dashboard/contactus'}
                  className="justify-start"
                >
                  <HiOutlinePhone className="mr-2" />
                  Contact Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddPhoneModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={handleAddPhone}
      />

      <UpdatePhoneModal
        data={selectedPhone}
        isOpen={isUpdateModalOpen}
        onRequestClose={closeUpdateModal}
        onSubmit={updatePhone}
        isUpdating={isUpdating}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onRequestClose={closeDeleteModal}
        onConfirm={confirmDeletePhone}
        title="Delete Phone Number"
        message="Are you sure you want to delete this phone number? This action cannot be undone."
        itemName={selectedPhone ? `${selectedPhone.country_code} ${selectedPhone.phone_number}` : undefined}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default DashboardPage; 