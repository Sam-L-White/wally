import React, {useState, useEffect, useRef} from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {
    getFirestore,
    collection,
    query,
    getDocs,
  } from 'firebase/firestore';
import { Timer } from "./Timer";
import { Leaderboard } from "./Leaderboard";

const Game = () => {

    const sceneRef = useRef()
    const [foundTracker, setFoundTracker] = useState({
        wally: false,
        wizard: false,
        odlaw: false
    })
    const [timerActive, setTimerActive] = useState(true)
    const [gameFinished, setGameFinished] = useState(false)
    const [time, setTime] = useState(0)

    useEffect(() => {
        let intervalId
        if (timerActive) {
        intervalId = setInterval(() => setTime(time + 1), 10)
        }
        return () => clearInterval(intervalId)
    }, [timerActive, time])

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000)
    const seconds = Math.floor((time % 6000) / 100)
    const milliseconds = time % 100

    async function getCoordinates(db) {
        const coordinatesCol = collection(db, 'coordinates')
        const coordinatesSnapshot = await getDocs(coordinatesCol)
        const coordinatesList = coordinatesSnapshot.docs.map(doc => doc.data())
        return coordinatesList 
    }

    useEffect(() => {
        if(foundTracker.wally && foundTracker.wizard && foundTracker.odlaw){
            setTimerActive(false)
            setGameFinished(true)
        }
    }, [foundTracker.wally, foundTracker.wizard, foundTracker.odlaw, timerActive])

    const clickHandle = (e, character) => {
        let rect = sceneRef.current.getBoundingClientRect()
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
    
        const db = getFirestore()
        getCoordinates(db).then((data) => {
            let coordinates = data

            switch (character){
                case 'wally':
                    let walxUpper = coordinates[0].wally[0] + 50
                    let walxLower = coordinates[0].wally[0] - 50
                    let walyUpper = coordinates[0].wally[1] + 50
                    let walyLower = coordinates[0].wally[1] - 50
                    if(x <= walxUpper && x >= walxLower && y <= walyUpper && y >= walyLower){
                        setFoundTracker(prevState => ({
                            ...prevState,
                            wally: true
                        }))
                    }
                    break;
                case 'wizard':
                    let wizxUpper = coordinates[0].wizard[0] + 50
                    let wizxLower = coordinates[0].wizard[0] - 50
                    let wizyUpper = coordinates[0].wizard[1] + 50
                    let wizyLower = coordinates[0].wizard[1] - 50
                    if(x <= wizxUpper && x >= wizxLower && y <= wizyUpper && y >= wizyLower){
                        setFoundTracker(prevState => ({
                            ...prevState,
                            wizard: true
                        }))
                    }
                    break;
                case 'odlaw':
                    let odxUpper = coordinates[0].odlaw[0] + 50
                    let odxLower = coordinates[0].odlaw[0] - 50
                    let odyUpper = coordinates[0].odlaw[1] + 50
                    let odyLower = coordinates[0].odlaw[1] - 50
                    if(x <= odxUpper && x >= odxLower && y <= odyUpper && y >= odyLower){
                        setFoundTracker(prevState => ({
                            ...prevState,
                            odlaw: true
                        }))
                    }
                    break;
                default:
                    break;
            }
        })
    }


    return(
        <div className="flex flex-col place-items-center">
            <Timer timerActive={timerActive} hours={hours} minutes={minutes} seconds={seconds} milliseconds={milliseconds}/>

            <ContextMenuTrigger mouseButton={0} id="wally-context">
                <div className="relative">
                    <img className="wallyImage" src="/images/scene.jpg" alt="scene" ref={sceneRef}/>
                    {foundTracker.wally ? <div className="absolute wallyLocation"></div> : null}
                    {foundTracker.wizard ? <div className="absolute wizardLocation"></div> : null}
                    {foundTracker.odlaw ? <div className="absolute odlawLocation"></div> : null}
                </div>
            </ContextMenuTrigger>

            <ContextMenu id="wally-context" className="flex flex-col border-4 border-black rounded-xl bg-white p-2">
                <MenuItem id="wally" className="hover:bg-gray-300 p-1 text-xl flex flex-row items-center gap-6" onClick={(e) => {
                        clickHandle(e, 'wally')}}>
                    <img src="/images/wally.jpg" className="h-20" alt="" />
                    <p className="ml-auto">Wally</p>
                </MenuItem>
                <MenuItem className="hover:bg-gray-300 p-1 text-xl flex flex-row items-center gap-6" onClick={(e) => {
                        clickHandle(e, 'wizard')}}>
                    <img src="/images/wizard.jpg" className="h-20" alt="" />
                    <p className="ml-auto">Wizard</p>
                </MenuItem>
                <MenuItem className="hover:bg-gray-300 p-1 text-xl flex flex-row items-center gap-6" onClick={(e) => {
                        clickHandle(e, 'odlaw')}}>
                    <img src="/images/odlaw.jpeg" className="h-20" alt="" />
                    <p className="ml-auto">Odlaw</p>
                </MenuItem>
            </ContextMenu>

            {gameFinished ? <Leaderboard hours={hours} minutes={minutes} seconds={seconds} milliseconds={milliseconds}/> : null}
        </div>
    )
}

export {Game}