'use client'

import { useSession } from "next-auth/react"
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import PlaylistFiture from "./PlaylistFiture"
import SearchUpdate from "./SearchUpdate"

const Search = ({ setView, setPlaylistId, setSongId, setPlayingTrack }) => {
        const { data: session } = useSession();
        const [search, setSearch] = useState(null)
        const [input, setInput] = useState('')
        const inputRef = useRef(null)

        async function searchUpdate(query) {
            if (session) {
                const token = session.accessToken
                const response = await fetch('https://api.spotify.com/v1/search?' + new URLSearchParams({
                    q: query,
                    type: ['artist', 'playlist', 'track']
                }), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                const data = await response.json()
                console.log(data)
                setSearch(data)
            }
        }

        useEffect(() => {
            inputRef.current.focus()
        }, [inputRef])

    return (
        <div className="flex-grow h-screen">
            <header className="text-white sticky top-0 h-20 z-10 text-4xl flex items-center px-8">
                <MagnifyingGlassIcon className="absolute top-7 left-10 h-6 w-6 text-neutral-800"/>
                <input ref={inputRef} value={input} onChange={async (e) => {
                setInput(e.target.value) ; await searchUpdate(e.target.value)}} className="rounded-full bg-white w-96 pl-12 text-neutral-900 text-base py-2 font-normal outline-0" placeholder="Search"/>
            </header>
            <div className="absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
           {session?.user?.image && <Image src={session?.user?.image} className="rounded-full h-7 w-7" alt="profile" width={50} height={50}/>}
            <span className="text-sm">{session?.user?.name}</span>
              <ChevronDownIcon className="h-5 w-5"/>
            </div>
            <div>
                {search === null ? <PlaylistFiture  setView={setView}
                setPlaylistId={setPlaylistId}/> : <SearchUpdate
                playlists={search?.playlists.items} 
                songs={search?.tracks.items}
                artists={search?.artists.items}
                setView={setView}
                setPlaylistId={setPlaylistId}
                setSongId={setSongId} 
                setPlayingTrack={setPlayingTrack}
                />}
            </div>
        </div>
    )
}

export default Search