import axios from "axios"
import { useEffect, useState } from "react"


export const getCurrentUser = () => {
    const [user, setUser] = useState()

    const userProfile = async () => {
        await axios.get('/api/users')
        .then((response) => {
            setUser(response.data)
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