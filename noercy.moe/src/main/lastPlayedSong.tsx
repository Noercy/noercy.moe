import {useEffect, useState} from "react"

interface Track {
    name: string;
    artist: string; 
    imageUrl: string;
    playingNow: boolean;
    playedAt?: string;
}

const LastPlayedSong: React.FC = () => {
    const [track, setTrack] = useState<Track | null>(null);

    const API_KEY = import.meta.env.VITE_LAST_FM_API_KEY;
    const USERNAME = "Noercy";

    
    const fetchLastPlayedSong = async () => {
        try {
            const response = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`
            );

            const data = await response.json();
            const lastTrack = data.recenttracks.track[0];

            if (lastTrack) {
                const isPlayingNow = lastTrack['@attr']?.nowplaying === 'true';

                setTrack({
                    name: lastTrack.name,
                    artist: lastTrack.artist['#text'],
                    imageUrl: lastTrack.image[2]['#text'],
                    playingNow: isPlayingNow,
                    playedAt: !isPlayingNow ? lastTrack.date?.uts : undefined,
                });
            }
        } catch (error) {
            console.error("error fetching song", error)
        }
    };

    // convert the unix timestap to time ago string
    const timeAgo = (timestamp: string) => {
        const secondsAgo = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
        const minutes = Math.floor(secondsAgo / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
        if (minutes < 60) return `${minutes} minutes ago`;
        if (hours < 24) return `${hours} hours ago`;
        return `${days} days ago`;
    }
    


    useEffect(() => {
        // Fetch the last played song when the component mounts
        fetchLastPlayedSong();

        // Set up an interval to fetch the data every 5 minutes (300,000 ms)
        const intervalId = setInterval(fetchLastPlayedSong, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


    if (!track) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'end', gap: '1rem' }}>
        <img
          src={track.imageUrl || 'https://via.placeholder.com/64'}
          alt={track.name}
          width="100"
          height="100"
          style={{ borderRadius: '4px' }}
        />
         <div>
        <h3 style={{ margin: 0 }}>{track.name}</h3>
        <p style={{ margin: 0 }}>by {track.artist}</p>
        {!track.playingNow && track.playedAt && (
          <small style={{ color: '#555' }}>Played {timeAgo(track.playedAt)}</small>
        )}
        {track.playingNow && <small style={{ color: '#555' }}>Currently playing</small>}
      </div>
      </div>
    )
}


export default LastPlayedSong




