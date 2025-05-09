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
 <div class="h-screen font-sans bg-center bg-no-repeat  bg-cover " style={{ backgroundImage: `url(${logo})`,backgroundSize:'cover'}}>
<div class="container mx-auto h-full flex flex-1 justify-center items-center">
    <div class="w-full max-w-lg">
      <div class="leading-loose">
       <form className="max-w-sm m-4 p-10 bg-white/30 rounded shadow-xl  ml-16">

            <p class="text-black text-center text-lg font-bold">LOGIN</p>
              <div class="">
                <label class="block text-sm text-white" for="email">E-mail</label>
                <input class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="email" id="email"  placeholder="Digite o e-mail" aria-label="email" required/>
              </div>
              <div class="mt-2">
                <label class="block  text-sm text-white">Senha</label>
                 <input class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                  type="password" id="password" placeholder="Digite a sua senha" arial-label="password" required/>
              </div>

              <div class="mt-4 items-center flex justify-between">
                <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                  type="submit">Entrar</button>
                <a class="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-red-400"
                  href="#">Esqueceu a senha ?</a>
              </div>
              <div class="text-center">
                <a class="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
                    Criar uma conta
                </a>
              </div>

        </form>

      </div>
    </div>
  </div>
</div>
    </>
   }