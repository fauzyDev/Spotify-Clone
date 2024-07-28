'use client'

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import React from "react";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500"
]

const Artist = ({ artistId, setArtistId, setSongId, setPlayingTrack }) => {
    const { data: session } = useSession();
    const [artist, setArtist] = useState(null)
    const [topTrack, setTopTrack] = useState([])
    const [relatedArtist, setRelatedArtist] = useState([])
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

      async function getArtist() {
        const token = session.accessToken
            const data = await getData(`v1/playlists/${artistId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })  
            console.log(data)
            return data
      }

      async function getTrack() {
        const token = session.accessToken
            const data = await getData(`v1/artists/${artistId}/top-tracks`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })  
            console.log(data)
            return data
      }

      useEffect(() => {
        const fetchData = async () => {
          if (session) {
            setArtist(await getArtist())
            setTopTrack(await getTrack())
          }
        } 
        fetchData()
      }, [session, playlistId])
    
        useEffect(()=>{
          setColor(shuffle(colors).pop())
        },[artistId])

    return (
        <div>
            
        </div>
    );
}

export default Artist;
