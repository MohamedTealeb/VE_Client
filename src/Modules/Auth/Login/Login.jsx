import React, { useState } from 'react';
import logo from '../../../assets/WhatsApp Image 2025-05-06 at 12.31.39_3f99cae6.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { loginUser } from '../../../Apis/Auth/Login/Login_Api';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ email, password })).unwrap();
      toast.success('Logged in successfully!');
      navigate('/home');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    }
  };

  const clearErrorToast = () => {
    toast.dismiss();
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col lg:flex-row min-h-screen bg-[#050608]">
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-screen">
          <img
            src={logo}
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-36 bg-gradient-to-r from-[#050608] to-[#050608]">
          <div className="w-full max-w-md text-white">
            <h1 className="text-2xl font-semibold mb-4">Login</h1>
 
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full border border-black text-black rounded-md bg-white py-2 px-3"
                  autoComplete="off"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    required
                    className="w-full border border-black text-black rounded-md bg-white py-2 px-3 pr-10"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>

              <div className="mb-4 flex justify-between items-center">
                <Link to="/forgot-password" className="text-sm text-white hover:text-gray-300">
                  Forgot Password?
                </Link>
                <Link to="/signup" className="text-sm text-white hover:text-gray-300">
                  Don't have an account? 
                </Link>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer px-4 py-1 text-white font-bold tracking-wider bg-black hover:bg-white hover:text-black rounded"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}