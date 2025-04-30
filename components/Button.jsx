"use client"

import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'

const Button = ({ content, isPending }) => {

  useEffect(() => {
    console.log("isPending", isPending);
  }, [isPending])

  return (
    <button className=' bg-[#24AE7C] text-white text-base font-medium px-2.5 py-1.5 rounded mt-2.5 cursor-pointer w-full' type='submit'>{isPending ? <Loader2 /> : content}</button>
  )
}

export default Button
