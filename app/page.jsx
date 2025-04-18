"use client"

import Image from 'next/image'
import React, { useActionState, useEffect, useState } from 'react'
import './globals.css'
import bgImage from "../assets/image 21.png"
import emailIcon from "../assets/icon (1).png"
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Logo from '@/components/Logo'
import userIcon from "../assets/icon.png"

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState()
  const [divClicked, setDivClicked] = useState('')
  const [errorMessage, setErrorMessage] = useState('')  
  const router = useRouter()

  const user =  {
    full_name: '',
    email_address: '',
  }

  const register = async (user) => {
      await axios.post('/api/users', {full_name: user.full_name, email_address: user.email_address, phone_number: phoneNumber})
      .then((response) => {
        setPhoneNumber()
        !response.data.exist && router.push('/user-profile')
      })
      .catch((err) => {
        setPhoneNumber()
        setErrorMessage("There was an error creating your account. Please try again.")  
        console.error(err)
      })
  }

  const formSubmit = async(prevState, data) => {
    for(const key in user){
      user[key] = data.get(key)
    }

    if (user.full_name && user.email_address && phoneNumber && isValidPhoneNumber(phoneNumber)) {
      await register(user)
    }
  }

  const [userForm, formAction] = useActionState(formSubmit, user)
  
  return (
    <main className='grid grid-cols-12 h-screen'>
      <section className=' md:col-span-7 col-span-12 w-full h-full lg:px-24 md:px-14 sm:px-8 px-4 py-4 flex flex-col'>
        <Logo />
        <br />
        <section className=' mt-16 flex flex-col justify-center'>
          <h3 className=' mb-1 text-2xl text-white font-bold'>Hi there, ....</h3>
          <p className=' text-[#ABB8C4] text-sm font-medium'>Get Started with Appointments.</p>
          <br/>
          <form action={formAction} className=' flex flex-col gap-y-4'>
            <div className=' flex flex-col gap-y-1.5 '>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Full name</label>
              <div className={`flex items-center px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] outline-green-800 w-full gap-2 ${divClicked === 'full_name' ? ' border-[2.5px] border-solid border-[#24AE7C]' : 'border-[1px] border-solid border-[#363A3D]'}`} >
                <Image src={userIcon} width={16} height={16} alt='user icon' className='' priority />
                <input type="text" placeholder='djef tadj' name='full_name' className=' w-full py-2.5 outline-none' required onClick={() => setDivClicked('full_name')} />
              </div>
            </div>
            
            <div className=' flex flex-col gap-y-1.5 '>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Email address</label>
              <div className={` flex items-center px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] border-solid outline-green-800 w-full gap-2 ${divClicked === 'email_address' ? ' border-[2.5px] border-solid border-[#24AE7C]' : ' border-[1px] border-solid border-[#363A3D]'}`}>
                <Image src={emailIcon} width={16} height={16} alt='user icon' className='' priority />
                <input type="email" placeholder='example@gmail.com' name="email_address" className=' w-full py-2.5 outline-none' onClick={() => setDivClicked('email_address')} required />
              </div>
            </div>

            <div className=' flex flex-col gap-y-1.5 '>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Phone number</label>
              <div className={`flex items-center px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 ${divClicked === 'phone_number' ? ' border-[2.5px] border-solid border-[#24AE7C]' : 'border-[1px] border-solid border-[#363A3D]'}`}>
                <PhoneInput
                    placeholder="+00 0342 0453 34"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    onClick={() => setDivClicked('phone_number')}
                    className='w-full h-full py-2.5 text-white'
                />
              </div>
            </div>

            <Button content={'Get started'} />

          </form>

          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </section>
        
        <div className=' flex items-center justify-between mt-auto'>
          <p className='text-[#ABB8C4] text-sm font-medium'>@carepulse copyright</p>
          <Link href={'#'} className='text-sm font-medium text-[#24AE7C]'>Admin</Link>
        </div>
      </section>

      <div className=' md:col-span-5 md:block hidden w-full h-screen'>
        <Image src={bgImage} alt='' className=' w-full h-full' priority />
      </div>
    </main>
  )
}

export default Home
