import Navbar from "./components/navbar"
import Hero from "./components/hero"
import Privacy from "./components/privacy"
import CloudStorage from "./components/cloud-storage"
import Security from "./components/security"
import Features from "./components/features"
import EmailTracking from "./components/email-tracking"
import Footer from "./components/footer"
import Banner from "./components/banner"



export default function Home() {
 
  return (
    <div className="overflow-x-hidden w-full">
     <Banner/>
      <Navbar />
      <main>
        <Hero />
        <Privacy />
        <CloudStorage />
        <Security />
        <Features />
        <EmailTracking />
      </main>
      <Footer />
      <div className="bg-[#383838] w-full py-1 md:py-2 text-[12px] font-inter text-center text-white">
      &copy; Copyright 2024 All rights reserved | Neuro Mail
      </div>
    </div>
  )
}

