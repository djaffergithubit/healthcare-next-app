'use client'

import React, { useState } from 'react'
import Logo from '@/components/Logo'
import Image from 'next/image'
import illustration from "../../assets/Illustration.png"
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import emailIcon from "../../assets/icon (1).png"
import agendaIcon from "../../assets/agenda.png"

const PersonalInformation = () => {
  const [phoneNumber, setPhoneNumber] = useState()
  return (
    <div className=' grid grid-cols-12'>
      <div className=' col-span-9 w-full px-10 py-4'>
        <Logo />
        <section className=' mt-16 flex flex-col justify-center'>
            <h3 className=' mb-1 text-2xl text-white font-bold'>Welcome 👋</h3>
            <p className=' text-[#ABB8C4] text-sm font-medium'>Let us know more about yourself.</p>
            <br/>
        </section>
        <h3 className=' text-2xl font-bold text-white mt-1'>Personal information</h3>
        <br />
        <form className=' flex flex-col gap-y-4'>
          <div className=' flex flex-col gap-y-1.5 '>
            <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Full name</label>            
              <input type="text" placeholder='ex: djef' name='full_name' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#678397]' required />
          </div>
          
          <section className=' grid grid-cols-12 gap-x-3.5 gap-y-4'>
            <div className=' flex flex-col gap-y-1.5 col-span-6 w-full '>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Email address</label>            
                <div className='flex items-center px-2.5 rounded text-white text-sm bg-[#1A1D21] border-solid w-full gap-2 border-[1px] border-[#363A3D] h-full'>
                  <Image src={emailIcon} width={16} height={16} alt='user icon' className='' priority />
                  <input type="email" placeholder='example@gmail.com' name="email_address" className=' h-full py-2.5 outline-none rounded-xl ' required />
                </div>
            </div>

            <div className=' flex flex-col gap-y-1.5 col-span-6 w-full'>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Phone number</label>
                <PhoneInput
                    placeholder="+00 0342 0453 34"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    className='w-full h-full py-2.5 text-white px-2.5 text-sm bg-[#1A1D21] gap-2 border-[1px] border-solid border-[#363A3D] rounded-xl'
                />
            </div>

            <div className=' flex flex-col gap-y-1.5 col-span-6 w-full '>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Date of birth</label>            
                <div className=''>
                  <input type="date" placeholder='Select your birthday' name="birth_day" className='py-2.5 outline-none  px-2.5 text-white text-sm bg-[#1A1D21] border-solid w-full gap-2 border-[1px] border-[#363A3D] h-full rounded-xl' required />
                </div>
            </div>

            <div className=' flex flex-col gap-y-1.5 col-span-6 w-full'>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Address</label>            
              <input type="text" placeholder='ex: 14 street, New York, NY - 5101' name='Address' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D]' required />
            </div>

            <div className=' flex flex-col gap-y-1.5 col-span-6 w-full '>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Occupation</label>            
              <input type="text" placeholder='Software Engineer' name='occupation' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D]' required />
            </div>

            <div className=' flex flex-col gap-y-1.5 col-span-6 w-full'>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Emergency contact name</label>            
              <input type="text" placeholder='Guardian’s name' name='emergency_contact_name ' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D]' required />
            </div>

          </section>
        </form>
      </div>
      <div className=' col-span-3 w-full'>
        <Image src={illustration} alt='Illustration Image' className=' h-screen' priority />
      </div>
    </div>
  )
}

export default PersonalInformation