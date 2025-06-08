import React, { useState } from 'react';
import logo from '../../../assets/WhatsApp Image 2025-05-06 at 12.31.39_3f99cae6.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../Apis/Auth/ForgotPassword/ForgotPassword_Api';
import { resetPassword } from '../../../Apis/Auth/ResetPassword/ResetPassword_Api';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (otpSent) {
      if (!formData.otp) {
        newErrors.otp = 'OTP is required';
      } else if (formData.otp.length !== 6) {
        newErrors.otp = 'OTP must be 6 digits';
      } else if (!/^\d+$/.test(formData.otp)) {
        newErrors.otp = 'OTP must contain only numbers';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Sending OTP request for email:', formData.email);
      const result = await dispatch(forgotPassword(formData.email)).unwrap();
      console.log('OTP request response:', result);
      
      if (result) {
        toast.success('OTP has been sent to your email');
        setOtpSent(true);
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP request error:', error);
      toast.error(error || 'Failed to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedData = {
        email: formData.email.trim(),
        otp: formData.otp.trim(),
        password: formData.password.trim()
      };

      console.log('Sending reset password request:', {
        ...formattedData,
        password: '***'
      });
      
      const result = await dispatch(resetPassword(formattedData)).unwrap();
      
      console.log('Reset password response:', result);
      
      if (result.success || result.message === "Password reset successfully") {
        toast.success('Password has been reset successfully');
        navigate('/login');
      } else {
        toast.error(result.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      
      if (error.includes('Invalid OTP')) {
        toast.error('Invalid OTP. Please check the code and try again.');
        setFormData(prev => ({ ...prev, otp: '' }));
      } else if (error.includes('password')) {
        toast.error('Invalid password format. Please ensure it meets the requirements.');
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      } else if (error.includes('Network error')) {
        toast.error('Network error. Please check your connection and try again.');
      } else if (error.includes('All fields are required')) {
        toast.error('Please fill in all fields');
      } else {
        toast.error(error || 'Failed to reset password. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col lg:flex-row h-screen bg-[#050608]">
        <div className="w-full lg:w-1/2 h-screen">
          <img
            src={logo}
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-36 bg-gradient-to-r from-[#050608] to-[#050608]">
          <div className="w-full max-w-md text-white">
            <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
            <p className="text-sm text-gray-300 mb-6">
              {otpSent ? 'Enter OTP and new password' : 'Enter your email to receive OTP'}
            </p>

            <form onSubmit={otpSent ? handleResetPassword : handleSendOTP}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={otpSent}
                  className="w-full border border-black text-black rounded-md bg-white py-2 px-3"
                  autoComplete="off"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {otpSent && (
                <>
                  <div className="mb-4">
                    <label htmlFor="otp" className="block text-white">
                      OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      required
                      maxLength="6"
                      pattern="\d*"
                      inputMode="numeric"
                      className="w-full border border-black text-black rounded-md bg-white py-2 px-3"
                      placeholder="Enter 6-digit OTP"
                    />
                    {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                    <p className="text-xs text-gray-300 mt-1">
                      Enter the 6-digit code sent to your email
                    </p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-white">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-black text-black rounded-md bg-white py-2 px-3 pr-10"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    <p className="text-xs text-gray-300 mt-1">
                      Password must be at least 6 characters and contain uppercase, lowercase, and numbers
                    </p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-white">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full border border-black text-black rounded-md bg-white py-2 px-3 pr-10"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={toggleShowConfirmPassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer px-4 py-1 text-white font-bold tracking-wider bg-black hover:bg-white hover:text-black rounded"
                >
                  {isSubmitting 
                    ? (otpSent ? 'Resetting...' : 'Sending OTP...') 
                    : (otpSent ? 'Reset Password' : 'Send OTP')}
                </button>
              </div>

              <div className="mt-4 text-center">
                <Link to="/login" className="text-sm text-white hover:text-gray-300">
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword; 