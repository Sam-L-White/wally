import React, {useState, useEffect, useRef} from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const Game = () => {

    const sceneRef = useRef()

    const clickHandle = (e) => {
        let rect = sceneRef.current.getBoundingClientRect()
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
        console.log(x)
        console.log(y)
    }

    return(
        <div className="flex flex-col place-items-center">
            <ContextMenuTrigger mouseButton={0} id="wally-context">
                <img className="wallyImage" src="/images/scene.jpg" alt="scene" ref={sceneRef}/>
            </ContextMenuTrigger>

            <ContextMenu id="wally-context" className="flex flex-col border-4 border-black rounded-xl bg-white p-2">
                <MenuItem className="hover:bg-gray-300 p-1 text-xl flex flex-row items-center gap-6" onClick={clickHandle}>
                    <img src="/images/wally.jpg" className="h-20" alt="" />
                    <p className="ml-auto">Wally</p>
                </MenuItem>
                <MenuItem className="hover:bg-gray-300 p-1 text-xl flex flex-row items-center gap-6" onClick={clickHandle}>
                    <img src="/images/wizard.jpg" className="h-20" alt="" />
                    <p className="ml-auto">Wizard</p>
                </MenuItem>
                <MenuItem className="hover:bg-gray-300 p-1 text-xl flex flex-row items-center gap-6" onClick={clickHandle}>
                    <img src="/images/odlaw.jpeg" className="h-20" alt="" />
                    <p className="ml-auto">Odlaw</p>
                </MenuItem>
            </ContextMenu>
        </div>
    )
}

export {Game}