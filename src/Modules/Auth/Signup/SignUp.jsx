import React from 'react'
import logo from '../../../assets/WhatsApp Image 2025-05-06 at 08.13.39_0895e5d0.jpg'
import { Link } from 'react-router'

export default function SignUp() {
  return<>
<div class="h-screen font-sans bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover' }}>
  <div class="container mx-auto h-full flex flex-1 justify-center items-center">
    <div class="w-full max-w-lg">
      <div class="leading-loose">
        <form className="max-w-sm m-4 p-10 bg-transparent rounded shadow-xl ml-16">
          <p class="text-black text-center text-lg font-bold">SIGN UP</p>

          <div>
            <label class="block text-sm text-black" htmlFor="name">Full Name</label>
            <input class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="text" id="name" placeholder="Enter your full name" aria-label="name" required />
          </div>

          <div class="mt-2">
            <label class="block text-sm text-black" htmlFor="email">Email</label>
            <input class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="email" id="email" placeholder="Enter your email" aria-label="email" required />
          </div>

          <div class="mt-2">
            <label class="block text-sm text-black" htmlFor="password">Password</label>
            <input class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="password" id="password" placeholder="Create a password" aria-label="password" required />
          </div>

          <div class="mt-2">
            <label class="block text-sm text-black" htmlFor="confirmPassword">Confirm Password</label>
            <input class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="password" id="confirmPassword" placeholder="Confirm your password" aria-label="confirm password" required />
          </div>

          <div class="mt-4 items-center flex justify-between">
            <Link to={'/home'}>
              <button class="cursor-pointer px-4 py-1 text-white font-bold tracking-wider bg-black hover:bg-white hover:text-black rounded"
                type="submit">Sign Up</button>
            </Link>
            <a class="inline-block align-baseline font-bold text-sm text-white hover:text-red-400" href="login">
              Already have an account?
            </a>
          </div>

        </form>
      </div>
    </div>
  </div>
</div>
  
  </>
}
