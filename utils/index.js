import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const useCurrentUser = () => {
    const [user, setUser] = useState()

    const userProfile = async () => {
        await axios.get('/api/users')
        .then((response) => {
            setUser(response.data.user)
        })
        .catch((err) => {
          toast.error("Something Went wrong! Please try again.")
            console.error(err);
        })
    }

    useEffect(() => {
        userProfile()
    }, [])

    return user
}

export const useDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
  
    useEffect(() => {
      const fetchDoctors = async () => {
        setIsLoading(true)
        try {
          const response = await axios.get('/api/doctors', {
            withCredentials: true,
          });
          setDoctors(response.data.data);
          setIsLoading(false)
        } catch (err) {
          setIsLoading(false)
          toast.error("Something went wrong! Please try again.", {
            position: "top-right"
          })
          console.error(err);
        }
      };
  
      fetchDoctors();
    }, []);

    return {isLoading, doctors}
}

export const useOptions = (doctors) => {

    const [options, setOptions] = useState([])

    useEffect(() => {
        if (Object.keys(doctors).length > 0) {
            const doctorsOptions = doctors.map((doctor) => {
              return { value:`Dr. ${doctor.fullName}`, label:`Dr. ${doctor.fullName}` }
            })
      
            setOptions(doctorsOptions)
        }
    }, [doctors])

    return options
}

export const logout = async () => {
  await axios.delete('/api/users')
  .then((response) => {
    console.log('shadjkhasd');
  })
  .catch((err) => {
    console.log(err);
  })
  
}