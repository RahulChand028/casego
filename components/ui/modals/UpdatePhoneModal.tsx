'use client'
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlinePhone } from 'react-icons/hi';
import { Modal, PhoneInput, Button } from '../index';
import { showToast } from '@/lib/toast';

interface UpdatePhoneModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: { countryCode: string; phoneNumber: string }) => void;
  data: {
    id: string;
    country_code: string;
    phone_number: string;
  } | null;
  isUpdating: boolean;
}

interface FormData {
  countryCode: string;
  phoneNumber: string;
}

const UpdatePhoneModal: React.FC<UpdatePhoneModalProps> = ({
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
      countryCode: data?.country_code ?? '+91',
      phoneNumber: data?.phone_number ?? '',
    },
  });

  const watchedCountryCode = watch('countryCode');

  useEffect(() => {
    if (data) {
      setValue('countryCode', data.country_code);
      setValue('phoneNumber', data.phone_number);
    }
  }, [data, setValue]);

  const handleFormSubmit = async (formData: FormData) => {
    try {
      await onSubmit({
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber,
      });
      reset();
      onRequestClose();
    } catch (error) {
      showToast.error('Failed to update phone number');
    }
  };

  const handleClose = () => {
    reset();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      title="Update Phone Number"
      size="md"
    >
      <div className="flex items-center gap-2 mb-4">
        <HiOutlinePhone className="text-xl text-gray-600" />
        <span className="text-sm text-gray-500">
          Update your phone number for WhatsApp notifications
        </span>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="flex gap-2">
          {/* Country Code Dropdown */}
          <select
            className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white w-[100px] ${
              errors.countryCode ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('countryCode', {
              required: 'Country code is required',
            })}
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+86">🇨🇳 +86</option>
            <option value="+81">🇯🇵 +81</option>
            <option value="+49">🇩🇪 +49</option>
            <option value="+33">🇫🇷 +33</option>
            <option value="+39">🇮🇹 +39</option>
            <option value="+7">🇷🇺 +7</option>
            <option value="+55">🇧🇷 +55</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+82">🇰🇷 +82</option>
            <option value="+34">🇪🇸 +34</option>
            <option value="+31">🇳🇱 +31</option>
            <option value="+46">🇸🇪 +46</option>
            <option value="+41">🇨🇭 +41</option>
            <option value="+65">🇸🇬 +65</option>
            <option value="+971">🇦🇪 +971</option>
            <option value="+966">🇸🇦 +966</option>
            <option value="+27">🇿🇦 +27</option>
            <option value="+52">🇲🇽 +52</option>
            <option value="+90">🇹🇷 +90</option>
            <option value="+62">🇮🇩 +62</option>
            <option value="+60">🇲🇾 +60</option>
            <option value="+66">🇹🇭 +66</option>
            <option value="+84">🇻🇳 +84</option>
            <option value="+63">🇵🇭 +63</option>
            <option value="+92">🇵🇰 +92</option>
            <option value="+880">🇧🇩 +880</option>
            <option value="+94">🇱🇰 +94</option>
            <option value="+977">🇳🇵 +977</option>
            <option value="+20">🇪🇬 +20</option>
            <option value="+234">🇳🇬 +234</option>
            <option value="+254">🇰🇪 +254</option>
            <option value="+212">🇲🇦 +212</option>
            <option value="+213">🇩🇿 +213</option>
            <option value="+216">🇹🇳 +216</option>
            <option value="+98">🇮🇷 +98</option>
            <option value="+964">🇮🇶 +964</option>
            <option value="+972">🇮🇱 +972</option>
            <option value="+962">🇯🇴 +962</option>
            <option value="+961">🇱🇧 +961</option>
            <option value="+974">🇶🇦 +974</option>
            <option value="+965">🇰🇼 +965</option>
            <option value="+968">🇴🇲 +968</option>
            <option value="+973">🇧🇭 +973</option>
            <option value="+32">🇧🇪 +32</option>
            <option value="+43">🇦🇹 +43</option>
            <option value="+45">🇩🇰 +45</option>
            <option value="+47">🇳🇴 +47</option>
            <option value="+358">🇫🇮 +358</option>
            <option value="+351">🇵🇹 +351</option>
            <option value="+30">🇬🇷 +30</option>
            <option value="+48">🇵🇱 +48</option>
            <option value="+420">🇨🇿 +420</option>
            <option value="+36">🇭🇺 +36</option>
            <option value="+40">🇷🇴 +40</option>
            <option value="+359">🇧🇬 +359</option>
            <option value="+385">🇭🇷 +385</option>
            <option value="+386">🇸🇮 +386</option>
            <option value="+421">🇸🇰 +421</option>
            <option value="+370">🇱🇹 +370</option>
            <option value="+371">🇱🇻 +371</option>
            <option value="+372">🇪🇪 +372</option>
          </select>

          {/* Phone Number Input */}
          <input
            type="tel"
            placeholder="123-456-7890"
            className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9\s\-\(\)]+$/,
                message: 'Please enter a valid phone number',
              },
              minLength: {
                value: 7,
                message: 'Phone number must be at least 7 digits',
              },
            })}
          />
        </div>

        {(errors.countryCode || errors.phoneNumber) && (
          <p className="text-sm text-red-600">
            {errors.countryCode?.message || errors.phoneNumber?.message}
          </p>
        )}

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
            {isUpdating ? 'Updating' : 'Update Phone Number'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdatePhoneModal; 