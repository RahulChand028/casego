"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/common/clientAuth";
import { User } from "better-auth";
import Link from "next/link";
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

import Sidebar from '@/components/Sidebar';
import AddPhoneModal from '@/components/AddPhoneModal';
import UpdatePhoneModal from '@/components/UpdatePhoneModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import Loading from '@/components/Loading';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState<any[]>([]);
  const [loadingPhones, setLoadingPhones] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState<any>(null);

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

    } catch (error) {
    }
  };

  const handleEditPhone = (phone: any) => {
    setIsUpdateModalOpen(true);
    setSelectedPhone(phone);
  };

  const handleDeletePhone = (phone: any) => {
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
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete phone number');
      }
    } catch (error) { } finally {
      setIsDeleting(false);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedPhone(null);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const closeUpdateModal = () => setIsUpdateModalOpen(false)


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
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete phone number');
      }
    } catch (error) { } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <Loading fullScreen={true} size="md" text="Loading Dashboard" />;
  }

  return (
    <div className="min-h-screen font-sans pt-24">

      <AddPhoneModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={handleAddPhone}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onRequestClose={closeDeleteModal}
        onConfirm={confirmDeletePhone}
        isDeleting={isDeleting}
      />

      <UpdatePhoneModal
        data={selectedPhone}
        isOpen={isUpdateModalOpen}
        onRequestClose={closeUpdateModal}
        onSubmit={updatePhone}
      />

      <div className="flex gap-6">
        <Sidebar user={user} link='overview' />
        <div className="flex-1">

          {loadingPhones ? (
            <Loading size="md" text="Loading Phone Numbers" />
          ) : phoneNumbers.length > 0 ? (
            <div className="space-y-3">
              <div className="flex py-4 justify-end">
                <button
                  onClick={openModal}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors font-medium  text-sm cursor-pointer"
                >
                  Add Phone Number
                </button>
              </div>
              {phoneNumbers.map((phone, index) => (
                <div key={phone.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 hover:bg-yellow-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {phone.valid ? (
                          <HiOutlineCheckCircle className="text-green-500 text-xl" />
                        ) : (
                          <HiOutlineXCircle className="text-red-500 text-xl" />
                        )}
                        <span className="text-gray-700 font-medium">{phone.country_code}-{phone.phone_number}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${phone.valid
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {phone.valid ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500">
                        Added {new Date(phone.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditPhone(phone)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit phone number"
                        >
                          <HiOutlinePencil className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeletePhone(phone)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete phone number"
                        >
                          <HiOutlineTrash className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-sm text-gray-500 mt-2 text-center">
                {phoneNumbers.length}/5 phone numbers added
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center bg-yellow-50 border border-yellow-200 rounded-lg p-6 py-8 h-full">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Enable Report Delivery & AI Chat</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Add your phone number to receive automated reports<br />
                  and chat with our AI agent directly via WhatsApp.
                </p>
              </div>
              <button
                onClick={openModal}
                className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors font-medium cursor-pointer"
              >
                Add Phone Number
              </button>
            </div>
          )}
        </div>
      </div>




    </div>
  );
};

export default DashboardPage; 