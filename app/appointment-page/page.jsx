"use client"

import Button from '@/components/Button'
import Logo from '@/components/Logo'
import SelectInput from '@/components/SelectInput'
import React, { useActionState, useEffect, useState } from 'react'
import { Calendar, Loader2 } from 'lucide-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from 'next/image'
import bgImage from "@/assets/bg.png"
import { useDoctors, useOptions } from '@/utils'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

const page = () => {
    const { isLoading, doctors } = useDoctors()
    const [selectDoctor, setSelectDoctor] = useState()
    const [selectedDate, setSelectedDate] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const searchParams = useSearchParams()
    const msg = searchParams.get('successMsg')
    const hasShownToast = React.useRef(false)
    const options = useOptions(doctors)
    const router = useRouter()

    const appointmentDetails = {
        reasonOfAppointment: "",
        additionalCommentNotes: "",
    }

    const submitForm = async (prevState, data) => {
        setIsPending(true)
        for (const key in appointmentDetails) {
            appointmentDetails[key] = data.get(key)
        }

        (selectDoctor && selectedDate) ? 
            await axios.post('/api/appointments', {
                doctor: doctors?.find((doc) => doc.fullName == (selectDoctor.value).replace('Dr. ', ''))?._id,
                reasonOfAppointment: appointmentDetails.reasonOfAppointment,
                additionalCommentsNotes: appointmentDetails.additionalCommentNotes,
                appointmentDate: selectedDate
            }, {
                withCredentials: true   
            }) 
            .then((response) => {
                setIsPending(false)
                console.log(response.data);
                setSelectedDate(null)
                router.push(`/appointment-page/success-page/${response.data?.appointmentId}?successMsg=${encodeURIComponent(response.data.msg)}`)
            })
            .catch((err) => {   
                setIsPending(false)
                toast.error("Something went wrong! Please Try again.", {
                    position: "top-right"
                })
                console.error(err);
            })
        : 
            toast.error("Please fullfill all fields and try again!", {
                position: "top-center",
                autoClose: 3000
            }); setIsPending(false)
    }

    const [appointment, actionForm] = useActionState(submitForm, appointmentDetails)

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
    !isLoading ? <main className='grid grid-cols-12'>
        <div className='md:px-14 px-8 md:py-6 py-3 md:col-span-9 col-span-12 w-full'>
            <Logo />
            <section className=' mt-16 flex flex-col justify-center'>
                <h3 className=' mb-1 text-2xl text-white font-bold'>Hey There 👋</h3>
                <p className=' text-[#ABB8C4] text-sm font-medium'>Request a new appointment in 10 seconds</p>
                <br/>
            </section>
            <form className=' flex flex-col gap-x-3.5 gap-y-4 w-full' action={actionForm}>
                <div className=' flex flex-col gap-y-1.5 '>
                    <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Doctor</label>            
                    <SelectInput instanceId={"id-4"} selectedOption={selectDoctor} setSelectedOption={setSelectDoctor} options={options} required />
                </div>
                <section className='grid grid-cols-12 gap-x-3.5 gap-y-4 w-full'>
                    <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full'>
                        <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Reason for appointment </label>            
                        <textarea name="reasonOfAppointment" className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D] resize-none' placeholder='ex: Annual monthly check-up' id="" required rows={3}></textarea>
                    </div>

                    <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full'>
                        <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Additional comments/notes</label>            
                        <textarea name="additionalCommentNotes" className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D] resize-none' placeholder='ex: Prefer afternoon appointments, if possible' id="" rows={3}></textarea>
                    </div>
                </section>
                <div className='flex flex-col gap-y-1.5 col-span-12 w-full'>
                    <label className='text-sm text-[#ABB8C4] font-medium'>Expected appointment date</label>
                    <div className="relative w-full">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            placeholderText="Select your appointment date & time"
                            className="py-2.5 px-10 text-white text-sm bg-[#1A1D21] border border-[#363A3D] w-full rounded-xl outline-none"
                            dateFormat="dd/MM/yyyy h:mm aa"
                            showTimeSelect
                            timeIntervals={15} // you can change this to 30 or 60 if needed
                            wrapperClassName="w-full"
                            required
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ABB8C4] w-5 h-5" />
                    </div>

                </div>

                
                <div className=' w-full col-span-12'>
                    <Button content={"Submit and continue"} isPending={isPending} />
                </div>
            </form>
        </div>
        <div className=' md:col-span-3 md:block hidden w-full h-screen'>
            <Image src={bgImage} className=' h-screen' alt='' priority />
        </div>
    </main>
    : (
        <div className="flex items-center justify-center h-screen text-white bg-[#0D1117]">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Loading...</span>
        </div>
    )
  )
}

export default page