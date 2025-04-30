import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ReactOtpInput = ({setShowOpt}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('')
  const [successStatus, setSuccessStatus] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const inputRefs = Array(6).fill().map(() => React.createRef());
  const router = useRouter()

  const handleInput = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async () => {
    setIsPending(true)
    const enteredCode = code.join('');
    await axios.post('/api/users', { adminPassKey: JSON.stringify(enteredCode) })
    .then((response) => {
      setIsPending(false)
      setSuccessStatus(response.data.success)
      setErrorMessage('')
      router.push('/admin')
    })
    .catch((err) => {
      setIsPending(false)
      setSuccessStatus(err.response.data.success)
      setErrorMessage(err.response.data.msg)
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1F2C]/65  w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-[400px] p-6 rounded-lg border border-[#0FA0CE] bg-[#1A1D21] shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-white text-xl font-semibold">Access Verification</h2>
          <button className="text-gray-400 hover:text-white cursor-pointer" onClick={() => setShowOpt(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-400 text-sm mb-6">
          To access the admin page, please enter the passkey...
        </p>

        <div className={`grid grid-cols-6 gap-2 ${!errorMessage ? 'mb-6' : 'mb-2'}`}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-full h-12 text-center text-2xl font-bold rounded border-2 
                focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-[#131619] placeholder:text-white placeholder:text-3xl placeholder:font-medium
                ${digit ? 'border-[#2ED3AE] text-[#2ED3AE]' : 'border-[#363A3D] text-white'}
                transition-colors duration-200`}
                placeholder='0'
            />
          ))}
        </div>

        {errorMessage && !successStatus && <p className=' text-red-500 text-sm text-center pb-2 pt-0.5'>{errorMessage}</p>}

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-[#24AE7C] text-white 
            font-semibold rounded transition-colors duration-200 cursor-pointer"
        >
          {isPending ? <div className=' flex items-center justify-center gap-1.5'><Loader2 />Loading...</div> : 'Enter admin panel'}
        </button>
      </div>
    </div>
  );
};

export default ReactOtpInput