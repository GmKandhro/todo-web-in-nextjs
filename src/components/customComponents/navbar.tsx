"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import { useToast } from '../ui/use-toast'
import { PromiseType } from '@/types/Apiresponse'
import { useRouter } from 'next/navigation'
import Userinfo from '@/hooks/userinfo'
import { useTodoContext } from '@/context'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const route = useRouter()
  const {user,token} =  Userinfo()
const {logoutUser} = useTodoContext()
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link className="text-xl font-bold text-gray-900" href="/">
              Todo App
            </Link>
            <div className="hidden md:flex ml-10 space-x-4">
            <Link className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium" href="/">
             Home
            </Link>
            {token && 
            <Link className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium" href="/dashboard">
            Dashboard
           </Link>
            }
              {token ? (<span className="text-gray-800 ml-12 font-semibold px-3 py-2 text-center rounded-md text-sm ">
              </span>) : ""}

            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {token ? (<button
              className="text-gray-800 bg-[#6b83eb] hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
              onClick={logoutUser}
            >
              Logout
            </button>) : (
              <>
            <Link href="/signup"
              className="text-gray-800 bg-[#6b83eb] hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
           
              >
              Sign up
            </Link>
            <Link href="/signin"
              className="text-gray-800 bg-[#6b83eb] hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
           
              >
              Sign in
            </Link>
              </>
          )}

          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isOpen ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium" href="/">
             Home
            </Link>
            {token && 
            <Link className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium" href="/dashboard">
             Dashboard
            </Link>
            }
           
           
            <span className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
            </span>
            <button
              className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
