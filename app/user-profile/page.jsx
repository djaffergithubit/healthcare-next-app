'use client'

import React, { useActionState, useEffect, useState } from 'react'
import Logo from '@/components/Logo'
import Image from 'next/image'
import illustration from "@/assets/Illustration.png"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import emailIcon from "@/assets/icon (1).png"
import SelectInput from '@/components/SelectInput'
import Button from '@/components/Button'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar, Loader2 } from 'lucide-react'
import { useDoctors, useOptions } from '@/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

const page = () => {
  const {isLoading, doctors} = useDoctors()
  const searchParams = useSearchParams()
  const msg = searchParams.get('successMsg')
  const hasShownToast = React.useRef(false)
  const options = useOptions(doctors)
  const [currentUser, setCurrentUser] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [selectDoctor, setSelectDoctor] = useState();
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const infos = {
    full_name: fullName,
    email_address: email,
    Address: "",
    occupation: "", 
    emergency_contact_name: "",
    Insurance_provider: "",
    Insurance_policy_number: "",
    Allergies: "", 
    Current_medications: "",
    Family_medical_history: "",
    Past_medical_history: "",
  }

  const formSubmission = async(prevState, data) => {
    setIsPending(true)
    for (const key in infos) {
      infos[key] = data.get(key)
    } 

    (phoneNumber && isValidPhoneNumber) ? await axios.put('/api/users', {
      fullName: infos.full_name,
      email: infos.email_address,
      phoneNumber: phoneNumber,
      dateOfBirth: selectedDate,
      address: infos.Address,
      occupation: infos.occupation,
      emergencyContactName: infos.emergency_contact_name,
      primaryCarePhysician: doctors?.find((doc) => doc.fullName == (selectDoctor.value).replace('Dr. ', ''))?._id,
      insuranceProvider: infos.Insurance_provider,
      insurancePolicyNumber: infos.Insurance_policy_number,
      allergies: infos.Allergies,
      currentMedications: infos.Current_medications,
      familyMedicalHistory: infos.Family_medical_history,
      pastMedicalHistory: infos.Past_medical_history
    }, {
      withCredentials: true
    })
    .then((response) => {
      setIsPending(false)
      console.log(response.data.data)
      router.push('/appointment-page')
    })
    .catch((error) => {
      setIsPending(false)
      console.error(error)
    }): toast.error('Invalid phone Number', {
      position: "top-center",
      autoClose: 3000
    });setIsPending(false)
  }

  const [userInformation, formAction] = useActionState(formSubmission, infos)

  const userProfile = async () => {
    await axios.get('/api/users', {
      withCredentials: true
    })
    .then((response) => {
        setCurrentUser(response.data.user)
        setFullName(response.data.user?.fullName || '')
        setEmail(response.data.user?.email || '')
        setPhoneNumber(response.data.user?.phoneNumber || '')
    })
    .catch((err) => {
        console.error(err);
    })
  }

  useEffect(() => {
    userProfile()
  }, [])

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
    !isLoading ? <div className=' grid grid-cols-12'>
      <div className=' md:col-span-9 md:block col-span-12 w-full px-10 py-4'>
        <Logo />
        <section className=' mt-16 flex flex-col justify-center'>
            <h3 className=' mb-1 text-2xl text-white font-bold'>Welcome 👋</h3>
            <p className=' text-[#ABB8C4] text-sm font-medium'>Let us know more about yourself.</p>
            <br/>
        </section>
        <h3 className=' text-2xl font-bold text-white mt-1'>Personal information</h3>
        <br />
        <form className=' flex flex-col gap-y-4' action={formAction}>
          <div className=' flex flex-col gap-y-1.5 '>
            <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Full name</label>            
              <input type="text" placeholder='ex: djef' name='full_name' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#678397]' value={fullName}
  onChange={(e) => setFullName(e.target.value)} />
          </div>
          
          <section className=' grid grid-cols-12 gap-x-3.5 gap-y-4'>
            <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full '>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Email address</label>            
                <div className='flex items-center px-2.5 rounded text-white text-sm bg-[#1A1D21] border-solid w-full gap-2 border-[1px] border-[#363A3D] h-full'>
                  <Image src={emailIcon} width={16} height={16} alt='user icon' className='' priority />
                  <input type="email" placeholder='example@gmail.com' name="email_address" value={email}
  onChange={(e) => setEmail(e.target.value)} className=' h-full py-2.5 outline-none rounded-xl ' />
                </div>
            </div>

            <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full'>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Phone number</label>
                <PhoneInput
                    placeholder="+00 0342 0453 34"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    className='w-full h-full py-2.5 text-white px-2.5 text-sm bg-[#1A1D21] gap-2 border-[1px] border-solid border-[#363A3D] rounded-xl'
                />
            </div>

            <div className='flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full'>
                <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Date of birth</label>   
                <div className="relative w-full">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        placeholderText="Select your birthday"
                        className="py-2.5 px-10 text-white text-sm bg-[#1A1D21] border border-[#363A3D] w-full rounded-xl outline-none"
                        dateFormat="dd/MM/yyyy"
                        wrapperClassName="w-full"
                        required
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ABB8C4] w-5 h-5" />
                </div>
            </div>

            <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full'>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Address</label>            
              <input type="text" placeholder='ex: 14 street, New York, NY - 5101' name='Address' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D]' />
            </div>

            <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full '>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Occupation</label>            
              <input type="text" placeholder='Software Engineer' name='occupation' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D]' />
            </div>

            <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full'>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Emergency contact name</label>            
              <input type="text" placeholder='Guardian’s name' name='emergency_contact_name' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D]' />
            </div>

          </section>
          <h3 className=' text-2xl font-bold text-white'>Medical information</h3>
          <br />
          <div className=' flex flex-col gap-y-1.5 '>
              <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Primary care physician</label>            
              {/* <input type="text" placeholder='ex: djef' name='Primary_care_physician' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#678397]' /> */}
              <SelectInput instanceId={"id-1"} selectedOption={selectDoctor} setSelectedOption={setSelectDoctor} options={options} />
          </div>
          <section className=' grid grid-cols-12 gap-x-3.5 gap-y-4 '>
              <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full'>
                  <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Insurance provider</label>            
                  <input type="text" placeholder='ex: BlueCross' name='Insurance_provider' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D]' />
              </div>
  
              <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full '>
                  <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Insurance policy number</label>            
                  <input type="text" placeholder='ex: ex: ABC1234567' name='Insurance_policy_number' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D]' />
              </div>
  
              <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full'>
                  <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Allergies (if Any)</label>            
                  <textarea name="Allergies" className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D] resize-none' placeholder='ex: Peanuts, Penicillin, Pollen' id="" rows={3}></textarea>
              </div>

              <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full'>
                  <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Current medications</label>            
                  <textarea name="Current_medications" className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D] resize-none' placeholder='ex: Ibuprofen 200mg, Levothyroxine 50mcg' id="" rows={3} required></textarea>
              </div>

              <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full'>
                  <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Family medical history (if relevant)</label>            
                  <textarea name="Family_medical_history" className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D] resize-none' placeholder='ex: Mother had breast cancer' id="" rows={3}></textarea>
              </div>

              <div className=' flex flex-col gap-y-1.5 lg:col-span-6 col-span-12 w-full'>
                  <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Past medical history</label>            
                  <textarea name="Past_medical_history" className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D] resize-none' placeholder='ex: Asthma diagnosis in childhood' id="" rows={3} required></textarea>
              </div>
          </section>
          <Button content={"Submit and continue"} isPending={isPending} />
        </form>
      </div>
      <div className=' md:col-span-3 md:block hidden w-full'>
        <Image src={illustration} alt='Illustration Image' className=' h-screen' priority />
      </div>
    </div>
    : 
    (
      <div className="flex items-center justify-center h-screen text-white bg-[#0D1117]">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Loading...</span>
      </div>
    )
  )
}

export default page