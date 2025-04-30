"use client"

import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

export default function page() {
  const [otp, setOtp] = useState('');

  return (
    <div className=' bg-white h-screen'>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        className="bg-red-400 text-7xl"
      />
      <div>
        <h5 className=' text-5xl text-white font-bold text-center'>Hello There!</h5>
      </div>
    </div>
  );
}