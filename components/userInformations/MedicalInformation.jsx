import React from 'react'

const MedicalInformation = () => {
  return (
    <div className=' grid grid-cols-12'>
        <div className=' col-span-9 w-full px-10 py-4'>
            <h3 className=' text-2xl font-bold text-white'>Medical information</h3>
            <br />
            <form action="" className='flex flex-col gap-y-4'>
                <div className=' flex flex-col gap-y-1.5 '>
                    <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Primary care physician</label>            
                    <input type="text" placeholder='ex: djef' name='Primary_care_physician' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#678397]' required />
                </div>
                <section className=' grid grid-cols-12 gap-x-3.5 gap-y-4'>
                    <div className=' flex flex-col gap-y-1.5 col-span-6 w-full'>
                        <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Insurance provider</label>            
                        <input type="text" placeholder='ex: BlueCross' name='Insurance_provider' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D]' required />
                    </div>
        
                    <div className=' flex flex-col gap-y-1.5 col-span-6 w-full '>
                        <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Insurance policy number</label>            
                        <input type="text" placeholder='ex: ex: ABC1234567' name='Insurance_policy_number' className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D]' required />
                    </div>
        
                    <div className=' flex flex-col gap-y-1.5 col-span-6 w-full'>
                        <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Allergies (if Any)</label>            
                        <textarea name="Allergies" className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D] resize-none' placeholder='ex: Peanuts, Penicillin, Pollen' id="" rows={3}></textarea>
                    </div>

                    <div className=' flex flex-col gap-y-1.5 col-span-6 w-full'>
                        <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Current medications</label>            
                        <textarea name="Current_medications" className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D] resize-none' placeholder='ex: Ibuprofen 200mg, Levothyroxine 50mcg' id="" rows={3} required></textarea>
                    </div>

                    <div className=' flex flex-col gap-y-1.5 col-span-6 w-full'>
                        <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Family medical history (if relevant)</label>            
                        <textarea name="Family_medical_history" className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D] resize-none' placeholder='ex: Mother had breast cancer' id="" rows={3}></textarea>
                    </div>

                    <div className=' flex flex-col gap-y-1.5 col-span-6 w-full'>
                        <label className=' text-sm text-[#ABB8C4] font-medium' htmlFor="">Past medical history</label>            
                        <textarea name="Past_medical_history" className=' py-2.5 outline-none px-2.5 rounded-xl text-white text-sm bg-[#1A1D21] w-full gap-2 border-[1px] border-solid border-[#363A3D] resize-none' placeholder='ex: Asthma diagnosis in childhood' id="" rows={3} required></textarea>
                    </div>
                </section>
            </form> 
        </div>
        <div className=' col-span-3 w-full'></div>
    </div>
  )
}

export default MedicalInformation