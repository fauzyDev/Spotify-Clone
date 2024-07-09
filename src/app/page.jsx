'use client'

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PlaylistView from "@/components/PlaylistView";
import Search from "@/components/Search";
import Artist from "@/components/Artist";
import Player from "@/components/Player";
import Library from "@/components/Library";

const Page = () => {
    const [view, setView] = useState('search')
    const [playlistId, setPlaylistId] = useState(null)
    const [artistId, setArtistId] = useState(null)
    const [songId, setSongId] = useState(null)
    const [playingTrack, setPlayingTrack] = useState(false)


    return (
      <>
      <main className="h-screen overflow-hidden bg-black">
        <div className="flex w-full">
        <Sidebar 
        view={view}
        setView={setView}
        setPlaylistId={setPlaylistId}
       />

        {view === 'playlist' && <PlaylistView 
        playlistId={playlistId} 
        setSongId={setSongId} 
        setPlayingTrack={setPlayingTrack} />}

        {view === 'search' && <Search 
        setView={setView}
        setPlaylistId={setPlaylistId}
        />}
        
        {view === 'artist' && <Artist/>}
        {view === 'library' && <Library 
        setView={setView}
        setPlaylistId={setPlaylistId}/>}

        </div>
    </main>
        <div className="sticky z-20 bottom-0 w-full">
          <Player
            songId={songId}
            setSongId={setSongId} 
            playingTrack={playingTrack}
            setPlayingTrack={setPlayingTrack}/>
        </div>
    </>
  );
}
export default Page