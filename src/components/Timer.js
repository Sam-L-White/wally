import React, {useState, useEffect} from "react";

const Timer = (props) => {

    return(
        <div>
            {props.hours}:{props.minutes.toString().padStart(2, "0")}:
            {props.seconds.toString().padStart(2, "0")}:
            {props.milliseconds.toString().padStart(2, "0")}
        </div>
    )
}

export {Timer}