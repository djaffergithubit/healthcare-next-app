import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export const useCurrentUser = () => {
    const [user, setUser] = useState()

    const userProfile = async () => {
        await axios.get('/api/users')
        .then((response) => {
            setUser(response.data.user)
        })
        .catch((err) => {
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
  
    useEffect(() => {
      const fetchDoctors = async () => {
        try {
          const response = await axios.get('/api/doctors', {
            withCredentials: true,
          });
          setDoctors(response.data.data);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchDoctors();
    }, []);

    return doctors
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