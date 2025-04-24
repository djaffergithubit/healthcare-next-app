import React from 'react'

const Button = ({ content, isPending }) => {
  return (
    <button className=' bg-[#24AE7C] text-white text-base font-medium px-2.5 py-1.5 rounded mt-2.5 cursor-pointer w-full' type='submit'>{isPending ? 'Loading...' : content}</button>
  )
}

export default Button
