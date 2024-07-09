"use client";

import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const SearchUpdate = ({ playlists, songs, artists }) => {

  function secondsToMinutes(duration) {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return seconds === 60 ? `${minutes + 1}:00` : `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <div className="flex flex-col gap-8 px-8 h-screen overflow-y-scroll">
      <div className="grid grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Top Search</h2>
          <div className="h-64 pr-8">
            <div className="cursor-pointer relative group h-64 w-full bg-neutral-800 hover:bg-slate-700 p-4 flex flex-col gap-6 rounded-md transition duration-500">
              <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 bottom-6 group-hover:bottom-8 right-8">
                <PlayIcon className="h-6 w-6 text-black" />
              </div>
                {playlists && <>
                    <Image className="h-28 w-28 rounded" src={playlists[0].images[0].url} width={28} height={28} alt="picture"/>
                    <p className="text-xl font-bold">{playlists[0].name}</p>
                    <p className="text-sm font-bold text-neutral-400">By {playlists[0].owner.display_name} <span className="rounded-full bg-neutral-900 text-white font-bold ml-4 py-1 px-8">Playlist</span></p>
                </>}
            </div>
          </div>
        </div>
        <div className="space-y-4">
        <h2 className="text-xl font-bold">Top Songs</h2>
            <div className="flex flex-col">
              {songs.slice(0, 6).map((song) => {
              return (
                  <div key={song.id} className="cursor-default w-full h-16 px-4 rounded-md flex items-center gap-4 hover:bg-neutral-900">
                    <Image className="h-10 w-10" src={song.album.images[0].url} width={10} height={10} alt="picture"/>
                    <div>
                        <p>{song.name}</p>
                        <p className="text-sm text-neutral-400">{song.artists[0].name}</p>
                    </div>
                    <div className="flex flex-grow items-center justify-end">
                      <p className="text-sm text-neutral-400">{secondsToMinutes(song.duration_ms)}</p>
                    </div>
                  </div>
              )})}
            </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Artist</h2>
        <div className="flex flex-wrap gap-4">
          {artists.slice(0, 4).map((artist) => {
            return (
              <div key={artist.id} className="cursor-pointer">
                
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchUpdate;
