import React from 'react'

const StatCard = ({ card }) => {
  return (
    <div className=' flex flex-col justify-center gap-y-3.5 p-6 bg-[#1F2326] lg:col-span-4 sm:col-span-6 col-span-12 rounded-xl'>
      <div className=' flex items-center gap-2'>
        {card.icon}
        <span className=' text-white text-xl font-semibold'>{card.statNumber}</span>
      </div>
      <p className=' text-base text-white font-medium'>{card.title}</p>
    </div>
  )
}

export default StatCard