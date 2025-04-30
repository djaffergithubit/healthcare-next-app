"use client"

import Logo from '@/components/Logo'
import React, { useEffect, useState } from 'react'
import checkCircle from "@/assets/check-circle.svg"
import Image from 'next/image'
import docImage from "@/assets/Avatar.png"
import { Calendar, Loader2 } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { formatDateTime } from '@/utils/formateDate'
import { toast } from 'react-toastify'

const page = ({ params }) => {

    const searchParams = useSearchParams()
    const msg = searchParams.get('successMsg')
    const { appointment_id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [currentAppointment, setCurrentAppointment] = useState()
    const hasShownToast = React.useRef(false)

    useEffect(() => {
        const getAppointmentDetails = async () => {
            setIsLoading(true)
            await axios.get(`/api/appointments/${appointment_id}`, {
                withCredentials: true
            })
            .then((response) => {
                setIsLoading(false)
                setCurrentAppointment(response.data.appointment)
                console.log(response.data);
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err);
            })
        }
        getAppointmentDetails()
    }, [params])

    useEffect(() => {
        if (msg && !isLoading && !hasShownToast.current) {
            toast.success(msg, {
                position: "top-right",
                autoClose: 3000
            })
            hasShownToast.current = true
        }
    }, [])
    
  return (
    !isLoading ? 
        <main className=' flex flex-col items-center px-14 py-8 h-screen'>
            <Logo />
            <section className=' mt-auto flex flex-col items-center justify-center'>
                <div className=' flex items-center justify-center'>
                    <Image src={checkCircle} alt='check circle icon' priority />
                </div>
                <div className=' text-4xl font-semibold text-white text-center max-w-xl w-full'>
                    Your <span className='text-[#24AE7C]'>appointment request</span> has been successfully submitted!
                </div>
                <p className=' text-lg font-medium text-[#ABB8C4] text-center mt-3'>We'll be in touch shortly to confirm.</p>
                <div className='w-full border-y-[0.5px] border-[#ABB8C4] py-8 grid grid-cols-12 place-items-center place-content-center px-10 max-w-4xl mt-4'>
                    <h4 className=' col-span-4 w-full font-medium text-lg text-[#ABB8C4] flex items-center justify-center'>Requested appointment details:</h4>
                    <div className=' col-span-4 w-full flex items-center justify-end'>
                        <div className=' max-w-[200px] w-full flex items-center justify-center p-2 rounded-lg text-white text-sm font-medium gap-2' style={{
                                                    background: "linear-gradient(117.58deg, rgba(215, 237, 237, 0.16) -47.79%, rgba(204, 235, 235, 0) 100%)"
                                            }}>
                            <Image src={docImage} alt='doctor profile Image' width={25} height={25} />
                            Dr. {currentAppointment?.doctor?.fullName}
                        </div>
                    </div>
                    <div className=" col-span-4 flex items-center justify-center gap-1.5 text-base font-medium text-[rgba(171,_184,_196,_1)] w-full">
                        <Calendar className="text-[#ABB8C4] w-5 h-5" />
                        {formatDateTime(currentAppointment?.appointmentDate)}
                    </div>
                </div>
            </section>
        </main>
         :     
        (<div className="flex items-center justify-center h-screen text-white bg-[#0D1117]">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Loading...</span>
        </div>)
        )
}

export default page