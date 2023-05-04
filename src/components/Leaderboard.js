import React, {useState, useEffect} from "react";
import Submit from "./Submit";
import {
    getFirestore,
    collection,
    query,
    getDocs,
    updateDoc,
    addDoc,
  } from 'firebase/firestore';

const Leaderboard = (props) => {

    const [scoreAdded, setScoreAdded] = useState(false)
    const [scores, setScores] = useState([])

    async function getleaderboard(db) {
        const leaderboardCol = collection(db, 'leaderboard')
        const leaderboardSnapshot = await getDocs(leaderboardCol)
        const leaderboardList = leaderboardSnapshot.docs.map(doc => doc.data())
        return leaderboardList 
    }

    async function addScore(e){
        e.preventDefault()
        let playerName = e.currentTarget.playerName.value
        let time = `${props.hours}:${props.minutes.toString().padStart(2, "0")}:${props.seconds.toString().padStart(2, "0")}:${props.milliseconds.toString().padStart(2, "0")}`

        try {
            await addDoc(collection(getFirestore(), 'leaderboard'), {
                name: playerName,
                time: time,
                timestamp: new Date()
            });

        } catch(error) {
            console.error('Error writing new message to Firebase Database', error);
        }

        setScoreAdded(true)

        const db = getFirestore()
        getleaderboard(db).then((data) => {
            data.sort(function (a, b) {
                return a.time.localeCompare(b.time)
            })
            setScores(data)
        })
    }


    return(
        <div className="flex flex-col items-center overflow-hidden">
            {scoreAdded ? 

            <div className="fixed top-1/4 bg-white border-2 border-black h-2/4 w-2/4 flex flex-col items-center gap-10 p-6 overflow-auto">
                <h1 className="text-6xl">Leaderboard</h1>
                <div className="flex flex-col gap-2 text-3xl">
                    {scores.map(score => {
                        return(
                            <div className="flex flex-row gap-32">
                                <p>{score.name}</p>
                                <p className="ml-auto">{score.time}</p>
                            </div>
                        ) 
                    })}
                </div>
            </div>
            
            : <Submit addScore={addScore} hours={props.hours} minutes={props.minutes} seconds={props.seconds} milliseconds={props.milliseconds}/>}
            
        </div>
    )
}

export {Leaderboard}