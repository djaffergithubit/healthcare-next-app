import React from 'react'
import { useFormStatus } from 'react-dom'

const Button = ({ content }) => {
    const { isPending } = useFormStatus()
  return (
    <button className=' bg-[#24AE7C] text-white text-base font-medium px-2.5 py-1.5 rounded mt-2.5 cursor-pointer w-full' type='submit'>{isPending ? 'Loading...' : content}</button>
  )
}

export default Button
