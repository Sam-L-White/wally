import React, {useState, useEffect} from "react";

const Timer = (props) => {

    const [time, setTime] = useState(0)

    useEffect(() => {
        let intervalId
        if (props.timerActive) {
        intervalId = setInterval(() => setTime(time + 1), 10)
        }
        return () => clearInterval(intervalId)
    }, [props.timerActive, time])

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000)
    const seconds = Math.floor((time % 6000) / 100)
    const milliseconds = time % 100

    return(
        <div>
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
        </div>
    )
}

export {Timer}