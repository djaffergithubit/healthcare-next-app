import Image from 'next/image'
import React from 'react'
import adminAvatar from "@/assets/Avatar.png"
import { Check, Hourglass, X } from 'lucide-react'

const appointments = [
    {
        "Patient": "Phoenix Baker",
        "Date": "Jan 4, 2022",
        "Status": "Scheduled",
        "Doctor": "Dr. Hardik Sharma",
        "icon": <Check size={16} />
    },
    {
        "Patient": "Phoenix Baker",
        "Date": "Jan 4, 2022",
        "Status": "Pending",
        "Doctor": "Dr. Hardik Sharma",
        "icon": <Hourglass size={16} />
    },
    {
        "Patient": "Phoenix Baker",
        "Date": "Jan 4, 2022",
        "Status": "Pending",
        "Doctor": "Dr. Hardik Sharma",
        "icon": <Hourglass size={16} />
    },
    {
        "Patient": "Phoenix Baker",
        "Date": "Jan 4, 2022",
        "Status": "Canceled",
        "Doctor": "Dr. Hardik Sharma",
        "icon": <X size={16} /> 
    }
]

const AppointmentTable = () => {
  return (
    <table className=' table-fixed w-full'>
        <thead className=' text-[#CDCECF] bg-[#0D0F10]'> 
            <th className=' w-1/5 text-start text-xs py-2 px-2'>Patient</th>
            <th className=' w-1/5 text-start text-xs py-2 px-2'>Date</th>
            <th className=' w-1/5 text-start text-xs py-2 px-2'>Status</th>
            <th className=' w-1/5 text-start text-xs py-2 px-2'>Doctor</th>
            <th className=' w-1/5 text-start text-xs py-2 px-2'>Actions</th>
        </thead>
        <tbody>
            {appointments.map((apt, index) => (
                <tr className={`${index % 2 === 0 ? 'bg-[#1C2023]' : 'bg-[#1A1D21]'} w-full`}>
                    <td className=' text-white text-sm py-2.5 px-2 flex items-center gap-2'>
                        <span className=' p-2.5 rounded-full text-[#0D0F10] bg-[#B6F09C]'>{apt.Patient?.split(' ')[0][0].toUpperCase() + apt.Patient?.split(' ')[1][0].toUpperCase()}</span>
                        {apt.Patient}
                    </td>
                    <td className=' text-sm text-[#E8E9E9] py-2.5 px-2'>{apt.Date}</td>
                    <td className=' py-2.5 px-2 flex items-start justify-start'>
                        <div className={`text-sm ${apt.Status === 'Pending' ? 'bg-[#152432] text-[#79B5EC]': apt.Status === 'Scheduled'? 'text-[#24AE7C] bg-[#0D2A1F]' : ' text-[#F37877] bg-[#3E1716]'} rounded-xl px-2.5 py-1 flex items-center justify-start gap-x-1.5`}>
                            {apt.icon}
                            {apt.Status}
                        </div>
                    </td>
                    <td className=' text-sm text-white py-2.5 px-2'>
                        <div className='flex items-center justify-start gap-2'>
                            <Image src={adminAvatar} alt='Avatar Image' width={25} height={25} priority />
                            {apt.Doctor}
                        </div>
                    </td>
                    <td className=' flex items-center text-sm py-2.5 px-2'>
                        <span className=' text-[#24AE7C] col-span-6 w-full'>Schedule</span>
                        <span className=' text-white col-span-6 w-full'>Cancel</span>
                    </td>
                </tr>
            )) }
        </tbody>
    </table>
  )
}

export default AppointmentTable