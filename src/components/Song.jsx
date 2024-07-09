'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { putData } from "@/libs/api";

const Song = ({ song, track, setSongId, setPlayingTrack }) => {
    const { data: session } = useSession();
    const [hover, setHover] = useState(false);

    async function playSong(track) {
        setSongId(track.id);
        setPlayingTrack(true);
        if (session) {
            const token = session.accessToken;
            const data = await putData('v1/me/player/play', {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ uris: [track.uri] })
            });
            console.log("Lagu sedang di play", data);
            return data
        }
    }

    

    function secondsToMinutes(duration) {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return seconds === 60 ? `${minutes + 1}:00` : `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <div 
            onClick={async () => await playSong(track)} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)} 
            className="grid grid-cols-2 text-neutral-400 text-sm py-4 px-5 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-default">

            <div className="flex items-center space-x-4 ">
                {hover ? <PlayIcon className="h-5 w-5 text-white" /> : <span className="w-5 ">{song + 1}</span>}
                <Image className="h-12 w-12" src={track.album.images[0]?.url} alt="song" width={35} height={35} />
                <div>
                    <span className="w-36 lg:w-64 truncate text-white text-base">{track.name}</span>
                    <p className="w-36 truncate">
                        {track.artists.map((artist, index) => (
                            <span key={artist.id} className="hover:underline">
                                {artist.name}{index !== track.artists.length - 1 && ", "}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto sm:ml-0">
                <p className="w-40 truncate hidden sm:inline">{track.album.name}</p>
                <p>{secondsToMinutes(track.duration_ms)}</p>
            </div>
        </div>
    );
}

export default Song;
