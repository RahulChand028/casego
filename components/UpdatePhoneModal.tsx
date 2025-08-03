'use client'
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { HiOutlinePhone, HiOutlineX } from 'react-icons/hi';

interface UpdatePhoneModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (data: { countryCode: string, phoneNumber: string }) => void;
    data: {
        country_code: string,
        id: string,
        phone_number: string
    }
}

interface FormData {
    countryCode: string;
    phoneNumber: string;
}

const countryCodes = [
    { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
    { code: '+44', country: 'UK', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
    { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
    { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
    { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italy' },
    { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
    { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
    { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
    { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
    { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain' },
    { code: '+31', country: 'NL', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+46', country: 'SE', flag: '🇸🇪', name: 'Sweden' },
    { code: '+41', country: 'CH', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
    { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE' },
    { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+27', country: 'ZA', flag: '🇿🇦', name: 'South Africa' },
    { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Mexico' },
    { code: '+90', country: 'TR', flag: '🇹🇷', name: 'Turkey' },
    { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
    { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+66', country: 'TH', flag: '🇹🇭', name: 'Thailand' },
    { code: '+84', country: 'VN', flag: '🇻🇳', name: 'Vietnam' },
    { code: '+63', country: 'PH', flag: '🇵🇭', name: 'Philippines' },
    { code: '+92', country: 'PK', flag: '🇵🇰', name: 'Pakistan' },
    { code: '+880', country: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
    { code: '+94', country: 'LK', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: '+977', country: 'NP', flag: '🇳🇵', name: 'Nepal' },
    { code: '+20', country: 'EG', flag: '🇪🇬', name: 'Egypt' },
    { code: '+234', country: 'NG', flag: '🇳🇬', name: 'Nigeria' },
    { code: '+254', country: 'KE', flag: '🇰🇪', name: 'Kenya' },
    { code: '+212', country: 'MA', flag: '🇲🇦', name: 'Morocco' },
    { code: '+213', country: 'DZ', flag: '🇩🇿', name: 'Algeria' },
    { code: '+216', country: 'TN', flag: '🇹🇳', name: 'Tunisia' },
    { code: '+98', country: 'IR', flag: '🇮🇷', name: 'Iran' },
    { code: '+964', country: 'IQ', flag: '🇮🇶', name: 'Iraq' },
    { code: '+972', country: 'IL', flag: '🇮🇱', name: 'Israel' },
    { code: '+962', country: 'JO', flag: '🇯🇴', name: 'Jordan' },
    { code: '+961', country: 'LB', flag: '🇱🇧', name: 'Lebanon' },
    { code: '+974', country: 'QA', flag: '🇶🇦', name: 'Qatar' },
    { code: '+965', country: 'KW', flag: '🇰🇼', name: 'Kuwait' },
    { code: '+968', country: 'OM', flag: '🇴🇲', name: 'Oman' },
    { code: '+973', country: 'BH', flag: '🇧🇭', name: 'Bahrain' },
    { code: '+32', country: 'BE', flag: '🇧🇪', name: 'Belgium' },
    { code: '+43', country: 'AT', flag: '🇦🇹', name: 'Austria' },
    { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Denmark' },
    { code: '+47', country: 'NO', flag: '🇳🇴', name: 'Norway' },
    { code: '+358', country: 'FI', flag: '🇫🇮', name: 'Finland' },
    { code: '+351', country: 'PT', flag: '🇵🇹', name: 'Portugal' },
    { code: '+30', country: 'GR', flag: '🇬🇷', name: 'Greece' },
    { code: '+48', country: 'PL', flag: '🇵🇱', name: 'Poland' },
    { code: '+420', country: 'CZ', flag: '🇨🇿', name: 'Czech Republic' },
    { code: '+36', country: 'HU', flag: '🇭🇺', name: 'Hungary' },
    { code: '+40', country: 'RO', flag: '🇷🇴', name: 'Romania' },
    { code: '+359', country: 'BG', flag: '🇧🇬', name: 'Bulgaria' },
    { code: '+385', country: 'HR', flag: '🇭🇷', name: 'Croatia' },
    { code: '+386', country: 'SI', flag: '🇸🇮', name: 'Slovenia' },
    { code: '+421', country: 'SK', flag: '🇸🇰', name: 'Slovakia' },
    { code: '+370', country: 'LT', flag: '🇱🇹', name: 'Lithuania' },
    { code: '+371', country: 'LV', flag: '🇱🇻', name: 'Latvia' },
    { code: '+372', country: 'EE', flag: '🇪🇪', name: 'Estonia' },
];

const UpdatePhoneModal: React.FC<UpdatePhoneModalProps> = ({
    isOpen,
    onRequestClose,
    onSubmit,
    data
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        defaultValues: {
            countryCode: data?.country_code ?? '',
            phoneNumber: data?.phone_number ?? ''
        }
    });


    useEffect(() => {
      if(data?.country_code) {
        setValue('countryCode',data.country_code);
        setValue('phoneNumber',data.phone_number);
      }
    },[data]);

    const handleFormSubmit = async (data: FormData) => {
        try {
            await onSubmit({
                countryCode: data.countryCode,
                phoneNumber: data.phoneNumber
            });
            reset();
            onRequestClose();
        } catch (error) {
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
            contentLabel="Update Phone Number"
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            overlayClassName="fixed inset-0 bg-gray-900/50 z-40"
            ariaHideApp={false}
        >
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 font-sans">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <HiOutlinePhone className="text-xl text-gray-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Update Phone Number</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <HiOutlineX className="text-xl" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <div className="flex gap-2">
                            {/* Country Code Dropdown */}
                            <select
                                className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white w-[100px] ${errors.countryCode ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                {...register('countryCode', {
                                    required: 'Country code is required',
                                })}
                                defaultValue="+91"
                            >
                                {countryCodes.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.flag} {country.code}
                                    </option>
                                ))}
                            </select>

                            {/* Phone Number Input */}
                            <input
                                id="phoneNumber"
                                type="tel"
                                placeholder="123-456-7890"
                                className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
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
                            <p className="mt-1 text-sm text-red-600">
                                {errors.countryCode?.message || errors.phoneNumber?.message}
                            </p>
                        )}
                    </div>

                    <div className="text-sm text-gray-500">
                        <p>Select your country code and enter your phone number without the country code</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-3 border-t-3 border-white border-t-gradient-to-r border-t-yellow-500 rounded-full animate-spin"></div>
                                    <span>Updating</span>
                                </div>
                            ) : (
                                'Update Phone Number'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default UpdatePhoneModal;