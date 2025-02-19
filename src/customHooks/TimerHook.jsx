import { useEffect } from "react"
import { useState } from "react"


export const useTimer = () => {

    const  [date, setDate] = useState(new Date())

    useEffect(() => {

        const interval = setInterval(() => {
            setDate(new Date())
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])
    return {
        date
    }
}