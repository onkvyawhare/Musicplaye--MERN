import { createContext, useEffect, useState } from "react";
import { useRef } from "react";
import { songsData } from "../assets/frontend-assets/assets";


export const PlayerContext=createContext();

const PlayerContextProvider=(props)=>{

    const audioRef=useRef();
    const seekBg=useRef();
    const seekBar=useRef();

    const[track,setTrack]=useState(songsData[0]);
    const[playstatus,setPlaystatus]=useState(false);
    const[time,setTime]=useState({
        curruntTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })


const play=()=>{
    audioRef.current.play();
    setPlaystatus(true)
}

const pause=()=>{
    audioRef.current.pause();
    setPlaystatus(false)

}

const playWithId=async(id)=>{
    console.log(`Playing song with ID: ${id}`);
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlaystatus(true);
}

const previusSong = async () => {
    if(track.id>0){
        await setTrack(songsData[track.id-1]);
        await audioRef.current.play();
        setPlaystatus(true);
    }
}

const nextSong = async () => {
    if(track.id<songsData.length-1){
        await setTrack(songsData[track.id+1]);
        await audioRef.current.play();
        setPlaystatus(true);
    }
}


const seekSong=async(e)=>{
    audioRef.current.currentTime=((e.nativeEvent.offsetX/seekBg.current.offsetWidth)*audioRef.current.duration)
}

useEffect(()=>
{
  setTimeout(()=>{
    audioRef.current.ontimeupdate=()=>{

        seekBar.current.style.width=(Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%";
        setTime({
            curruntTime:{
            second:Math.floor(audioRef.current.currentTime%60),
            minute:Math.floor(audioRef.current.currentTime/60)
        },
        totalTime:{
            second:Math.floor(audioRef.current.duration%60),
            minute:Math.floor(audioRef.current.duration/60)
        }

        })

    }
  })
},[audioRef])


    const contextValue={
        audioRef,
        seekBg,
        seekBar,
        track,setTrack,
        playstatus,setPlaystatus,
        time,setTime,
        play,pause,
        playWithId,
        previusSong,nextSong,
        seekSong

    }

    return(

        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>

    )
}

export default PlayerContextProvider;