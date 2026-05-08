
import Link from "next/link"
import MobileNav from "./mobile-nav"


export default function Navbar() {
  return (
    <header className=" top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-[70px] items-center justify-between px-6 sm:px-6 lg:px-[90px]">
        <Link href="/" className="flex items-center space-x-1 lg:space-x-3">
        <img src="neuromail1.svg" alt="" className="hidden lg:block" />
        <img src="neuromail.svg" alt="" className="lg:hidden"/>
        </Link>

        <nav className="hidden space-x-12 lg:flex">
          <Link href="#" className="text-[16px] text-gray-600 hover:text-gray-900">
            Home
        
          </Link>
          <Link href="#features" className="text-[16px] text-gray-600 hover:text-gray-900">
            Features
        
          </Link>
          <Link href="#benefits" className="text-[16px] text-gray-600 hover:text-gray-900">
            
            Benefits
          </Link>
          <Link href="#" className="text-[16px] text-gray-600 hover:text-gray-900">
          
            Solutions
          </Link>
        </nav>

       
        <div className="flex items-center space-x-4">
          <Link href="https://mailing.neuromail.cloud/">
          <button className="hidden lg:block bg-[#305EFF] text-white my-2 w-[150px] h-[45px] rounded-[9px] text-[16px] font-medium hover:bg-[#2347cc] transition-colors">
            Join Now
          </button>
         </Link>
        </div>
          <MobileNav />
  
      </div>
    </header>
  )
}

