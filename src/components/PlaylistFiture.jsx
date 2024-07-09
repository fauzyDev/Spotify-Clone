'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getData } from "@/libs/api";
import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const PlaylistFiture = ({ setView, setPlaylistId }) => {
    const { data: session } = useSession();
    const [playlists, setPlaylists] = useState([]);
    

    function selectPlaylist(playlist) {
      setView('playlist')
      setPlaylistId(playlist.id)
    }

    useEffect(() => {
        const fetchPlaylists = async() => {
          if (session) {
            const token = session.accessToken
            const data = await getData('v1/browse/featured-playlists?' + new URLSearchParams({
                country: 'ID'
            }), {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })  
            console.log(data)
            setPlaylists(data.playlists.items)
          }
        } 
        fetchPlaylists()
      }, [session])

    return (
        <div className="flex flex-col gap-4 px-8 h-screen overflow-y-scroll">
                <h2 className="text-2xl font-bold">Playlist Populer</h2>
                <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-3 gap-8 px-4 mb-48">
                    {playlists?.map((playlist, index) => {
                        return (
                            <div onClick={() => selectPlaylist(playlist)} key={index} className="corsor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4">
                              <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                                  <PlayIcon className="h-6 w-6 text-black"/>
                              </div>
                                <Image className="object-cover mb-4" src={playlist.images[0].url} priority={true} width={350} height={350} alt="picture"/>
                                <p className="text-base text-white font-bold mb-1 w-48 truncate">{playlist.name}</p>
                                <p className="text-sm text-neutral-400 mb-8 w-48 truncate">By {playlist.owner.display_name}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  );
                }

export default PlaylistFiture;
