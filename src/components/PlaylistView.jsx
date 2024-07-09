'use client'

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getData } from "@/libs/api";
import Image from "next/image";
import { shuffle } from "lodash";
import Song from "./Song";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500"
]

const PlaylistView = ({ playlistId, setSongId, setPlayingTrack }) => {
    const { data: session } = useSession();
    const [playlistData, setPlaylistData] = useState(null);
    const [color, setColor] = useState(colors[0])
    const [opacity, setOpacity] = useState(0)
    const [textOpacity, setTextOpacity] = useState(0)

    function changeOpacity(scrollPos) {
      const offset = 300
      const textOffset = 10
      if (scrollPos < offset) {
        const newOpacity = 1 - ((offset - scrollPos)/offset)
        setOpacity(newOpacity)
        setTextOpacity(0)
      } else {
        setOpacity(1)
        const text = scrollPos - offset
        const newTextOpacity = 1 - ((textOffset - text)/textOffset)
        setTextOpacity(newTextOpacity)
      }
    }
  
    useEffect(() => {
    const fetchPlaylistData = async() => {
      if (session) {
        const token = session.accessToken
        const data = await getData(`v1/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })  
        console.log(data)
        setPlaylistData(data)
      }
    } 
    fetchPlaylistData()
  }, [session, playlistId])

    useEffect(()=>{
      setColor(shuffle(colors).pop())
    },[playlistId])

    return(
        <div className="flex-grow h-screen">
            <header style={{ opacity: opacity }} className="text-white sticky top-0 h-20 z-10 text-4xl bg-neutral-800 p-8 flex items-center font-bold">
                <div style={{ opacity: textOpacity }} className="flex items-center">
                {playlistData && <Image className="h-8 w-8 mr-6" src={playlistData.images[0].url} alt="playlist" width={44} height={44}/>}
                <p>{playlistData?.name}</p>
                </div>
            </header>
            <div className="absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
            <Image className="rounded-full h-7 w-7" src={session?.user?.image} alt="profile" width={50} height={50}/>
            <span className="text-sm">{session?.user.name}</span>
              <ChevronDownIcon className="h-5 w-5"/>
            </div>
            <div onScroll={(e) => changeOpacity(e.target.scrollTop)} className="relative -top-20 h-screen overflow-y-scroll bg-neutral-900">
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900 ${color} h-80 text-white p-8`}>
            {playlistData && <Image className="h-44 w-44" src={playlistData.images[0].url} alt="playlist" width={44} height={44}/>}
              <div>
                <span className="text-sm font-bold">Playlist</span>
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold">{playlistData?.name}</h1>
              </div>
            </section>
            <div className="text-white px-8 flex flex-col space-y-1 pb-28">
              {playlistData?.tracks.items.map((track, index) => {
                return (
                  <Song setPlayingTrack={setPlayingTrack} setSongId={setSongId} key={track.track.id} song={index} track={track.track}/>
                  ) 
              })}
            </div>
          </div>
        </div>
      )
    }

export default PlaylistView