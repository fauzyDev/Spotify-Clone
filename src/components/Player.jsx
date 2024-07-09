'use client';

import { getData } from "@/libs/api";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const Player = ({ songId, setSongId, playingTrack, setPlayingTrack }) => {
    const { data: session } = useSession();
    const [song, setSong] = useState(null);

    const fetchInfoSong = useCallback( async (trackId) => {
        if (trackId) {
            const token = session.accessToken;
            const data = await getData(`v1/tracks/${trackId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(data);
            setSong(data);
        }
    }, [session])

    const playing = useCallback(async () => {
        const token = session.accessToken;
        const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status == 204) {
            console.log("204 response from currently playing");
            return
        }

        const data = await response.json()
        console.log(data)
        return data
    }, [session])

    const handler = useCallback(async () => {
        if (session) {
            const token = session.accessToken;
            const data = await playing();
            if (data?.is_playing) {
                const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status == 204) {
                    setPlayingTrack(false);
                }
            } else {
                const response = await fetch('https://api.spotify.com/v1/me/player/play', {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status == 204) {
                    setPlayingTrack(true);
                    setSongId(data.item.id);      
                }
            }
        }
    }, [session, playing, setPlayingTrack, setSongId])

    useEffect(() => {
        async function fetchSong() {
            if (session) {
                if (!songId) {
                    const data = await playing();
                    if (data) {
                        setSongId(data?.item?.id);
                        if (data.is_playing) {
                            setPlayingTrack(true);
                        }
                        await fetchInfoSong(data?.item?.id);
                    }
                } else {
                    await fetchInfoSong(songId);
                }
            }
        }
        fetchSong();
    }, [session, songId, fetchInfoSong, playing, setPlayingTrack, setSongId]);

    return (
        <div className="h-24 bg-neutral-800 border-t border-neutral-700 text-white grid grid-cols-3 text-xs sm:text-base px-2 sm:px-8">
            <div className="flex items-center space-x-4">
                {song?.album.images[0]?.url && (
                    <Image
                        className="hidden md:inline h-10 w-10"
                        src={song?.album?.images[0]?.url}
                        alt="song picture"
                        width={40}
                        height={40}/>
                    )}
                    
                <div>
                    <p className="text-white text-sm">{song?.name}</p>
                    <p className="text-neutral-400 text-xs">{song?.artists[0]?.name}</p>
                </div>
            </div>
            
            <div className="flex items-center justify-center">
                {playingTrack ? 
                <PauseCircleIcon onClick={handler} className="h-10 w-10 cursor-pointer" /> 
                : 
                <PlayCircleIcon onClick={handler} className="h-10 w-10 cursor-pointer" />
                }
            </div>
            <div></div>
        </div>
    );
}

export default Player;
