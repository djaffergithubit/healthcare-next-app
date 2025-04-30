"use client"

import Logo from '@/components/Logo'
import Image from 'next/image'
import React from 'react'
import adminAvatar from "@/assets/Avatar.png"
import StatCard from '@/components/Admin/StatCard'
import { AlertTriangle, CalendarCheck2, Hourglass } from 'lucide-react'
import AppointmentTable from '@/components/Admin/AppointmentTable'

const cards = [
  {
    "id": 1,
    "statNumber": 94,
    "title": "Total number of  scheduled appointments",
    "icon": <CalendarCheck2 className='text-[#FFD147] text-xl' />
  },

  {
    "id": 2,
    "statNumber": 67,
    "title": "Total number of  scheduled appointments",
    "icon": <Hourglass className=' text-[#79B5EC] text-xl' />
  },

  {
    "id": 3,
    "statNumber": 50,
    "title": "Total number of  scheduled appointments",
    "icon": <AlertTriangle className=' text-[#FF4F4E] text-xl' />
  },
  
]

const page = () => {

  return (
    <main className=''>
      <header className=' flex items-center justify-between bg-[#0D0F10] px-14 py-2.5'>
        <Logo />
        <div className=' flex items-center gap-2'>
          <Image src={adminAvatar} alt='Avatar Image' width={40} height={40} priority />
          <span className=' text-lg font-medium text-white'>Admin</span>
        </div>
      </header>
      <section className=' mt-8 flex flex-col justify-center px-14'>
          <h3 className=' mb-1 text-2xl text-white font-bold'>Welcome, Admin</h3>
          <p className=' text-[#ABB8C4] text-sm font-medium'>Start day with managing new appointments</p>
          <br/>
      </section>
      <section className=' mt-8 grid grid-cols-12 gap-5 px-14'>
        {cards.map((card, index) => (
          <StatCard key={index} card={card} />
        ))}
      </section>
      <section className='px-14 mt-8 w-full'>
        <AppointmentTable />
      </section>
    </main>
  )
}

export default page