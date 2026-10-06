import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import HeroSection from './Pages/HeroSection'
import MukuruLogin from './MukuruLogin'
import MukuruPasswordLogin from './MukuruPasswordLogin'
import MukuruOTP from './MukuruOTP'
import MukuruPin from './MukuruPin'
import OTPVerification from './OTPVerification'
import MobileNumber from './MobileNumber'
import MukuruOtpPage from './Mukuruotppage'

function App() {


  return (
    <>
      <div>
        {/* <HeroSection/> */}
        {/* <MukuruLogin/> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MukuruLogin />} />
            <Route path="/password" element={<MukuruPasswordLogin />} />

             <Route path="/otp" element={<MukuruOtpPage />} />
             {/* <Route path="/otp" element={<OTPVerification />} />   */}
             <Route path="/pin" element={<MukuruPin />} />  
             <Route path="/mobile" element={<MobileNumber />} />  
            {/* <Route path="/hero" element={<HeroSection />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
