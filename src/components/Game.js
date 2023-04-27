import React, {useState, useEffect, useRef} from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {
    getFirestore,
    collection,
    query,
    getDocs,
  } from 'firebase/firestore';

const Game = () => {

    const sceneRef = useRef()
    const [foundTracker, setFoundTracker] = useState({
        wally: false,
        wizard: false,
        odlaw: false
    })

    async function getCoordinates(db) {
        const coordinatesCol = collection(db, 'coordinates')
        const coordinatesSnapshot = await getDocs(coordinatesCol)
        const coordinatesList = coordinatesSnapshot.docs.map(doc => doc.data())
        return coordinatesList 
    }

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
            <ContextMenuTrigger mouseButton={0} id="wally-context">
                <img className="wallyImage" src="/images/scene.jpg" alt="scene" ref={sceneRef}/>
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
        </div>
    )
}

export {Game}