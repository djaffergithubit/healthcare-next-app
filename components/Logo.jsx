import Image from 'next/image'
import React from 'react'
import logoPath from "@/assets/logo.png"
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()
  return (
    <div className=' flex items-center gap-1 cursor-pointer' onClick={() => router.push('/')}>
          <Image
            src={logoPath} 
            alt="Logo"
            width={32}
            height={32}
            priority
          />
          <h3 className=' text-2xl font-bold text-white'>CarePulse</h3>
    </div>
  )
}

export default Logo