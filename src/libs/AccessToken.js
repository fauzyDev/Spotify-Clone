'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getData } from "@/libs/api"

const AccessToken = () => {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = 'dj the drum'
  
  useEffect(() => {
    const fetchTracks = async() => {
      if (session) {
        const token = session.accessToken
        const encodedQuery = encodeURIComponent(query);
        const data = await getData(`v1/search`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          query: `q=${encodedQuery}&type=track`
        })  
        console.log(data)
        setTracks(data.tracks.items)
      }
      setLoading(false)
    } 
    fetchTracks()
  }, [session])
 
  return(
    <>
      
    </>
  );
};

export default AccessToken
