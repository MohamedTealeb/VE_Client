import React from 'react'
import logo from '../../../assets/WhatsApp Image 2025-05-06 at 08.13.39_0895e5d0.jpg'
export default function Login() {
  return <>

  {/* <div class="h-screen  flex justify-center items-center  "  style={{
    backgroundImage: `url(${logo})`,
    backgroundSize: '100%',         
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
      
      <div class="w-full md:w-1/2 flex flex-col items-center mt-30 bg-white py-5 md:py-8 px-4">
        <h3 class="mb-4 font-bold text-3xl flex items-center text-blue-500">
          LOGIN
        </h3>
        <form action="#" class="px-3 flex flex-col justify-center items-center w-full gap-3">
          <input 
            type="email" placeholder="email.."
            class="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
          />
          <input 
            type="password" placeholder="password.."
            class="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
        />
          <button class="flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring rounded px-3 py-1">
            <svg class="w-5 h-5 inline"fill="none"stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            <p class="ml-1 text-lg">
              Login
            </p>
          </button>
        </form>
        <p class="text-gray-700 text-sm mt-2">
          don't have an account?
          <a href="#" class="text-green-500 hover:text-green-600 mt-3 focus:outline-none font-bold underline">
            register
          </a>
        </p>
      </div>
    </div> */}
    <div class=' h-screen bg-black w-screen flex justify-center items-center'>
    <div class="px-6 py-3 rounded border w-64">
        <div class="flex flex-col items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 class="text-2xl font-bold">Login</h2>
        </div>
        <form action="#" method="POST">
           
            <div class="flex flex-col my-2">
                <label class="text-xs text-gray-400">Username</label>
                <div class="text-xs text-red-400 flex justify-between items-center">
                    <span>
                    <b>Error: </b>
                    wrong username !
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <input 
                    class="border rounded px-3 py-1 mt-2"
                    type="text" 
                    value="John"/>
            </div>
            <div class="flex flex-col my-2">
                <label class="text-xs text-gray-400">Password</label>
                <input class="border rounded px-3 py-1 mt-2" type="password" value="password"/>
            </div>
            <div class="flex flex-col items-center justify-center my-3">
                <button class="my-3 py-1 w-full rounded bg-blue-600 text-blue-200">
                    Submit
                </button>
                <p class="text-xs text-gray-500">
                    Forgot password ? 
                        <a href="#" class="font-bold text-gray-700">Click here</a> 
                        to reset your password.
                </p>
            </div>
        </form>
    </div>
</div>
  
  </>
}
