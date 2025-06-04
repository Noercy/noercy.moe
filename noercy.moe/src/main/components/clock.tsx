import { useEffect, useState } from "react"

type Props = {
    time: number
}

export const Clock = ({ time: intital}: Props) => {
    const [time, setTime] = useState(new Date(intital))

    useEffect(() => {
       const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])
    

    return <div>{time.toLocaleTimeString()}</div>
}