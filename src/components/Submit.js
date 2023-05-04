import React, {useState, useEffect} from "react";

const Submit = (props) => {
    return(
        <div className="fixed top-1/4 bg-white border-2 border-black h-1/4 w-1/4 flex flex-col items-center gap-5 p-5">
            <h1 className="text-5xl">Congratulations!</h1>
            <p className="text-2xl">You completed the game in {props.hours}:{props.minutes.toString().padStart(2, "0")}:
            {props.seconds.toString().padStart(2, "0")}:
            {props.milliseconds.toString().padStart(2, "0")}!</p>
            <form onSubmit={props.addScore} className="flex flex-col items-center text-2xl gap-3">
                <label htmlFor="playerName">Enter your Name:</label>
                <input type="text" name="playerName" id="playerName" className="border-4 border-black rounded-xl p-2"/>
                <button className="border-2 border-black rounded-xl p-1 hover:bg-gray-200" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Submit