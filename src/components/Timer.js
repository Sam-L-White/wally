import React, {useState, useEffect} from "react";

const Timer = (props) => {

    return(
        <div className="text-4xl text-white mb-10">
            {props.hours}:{props.minutes.toString().padStart(2, "0")}:
            {props.seconds.toString().padStart(2, "0")}:
            {props.milliseconds.toString().padStart(2, "0")}
        </div>
    )
}

export {Timer}