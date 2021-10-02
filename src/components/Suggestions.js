import { useState, useRef } from "react";
import spotifyService from "../services/spotifyApi"

import { Button, Typography } from "@mui/material";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ListItemButton from '@mui/material/ListItemButton';

const Suggestions = ({mix}) => {
    const [results, setResults] = useState([])
    const ref = useRef()

    if(mix.length === 0){
        return null;
    }

    const generate = async () => {
        const res = await spotifyService.recommend(mix)
        const allSongs = res.tracks.map(song => {
            const name = song.name.substring(0,35)
            const link = song.external_urls.spotify
            const artist = song.artists[0].name
            const id = song.id
            const img = song.album.images[1].url;
            const added = mix.find(e => e.data.id === id) != null;
        
            return {name, link, artist, id, img, added}
        })
        setResults(allSongs)
        ref.current.scrollIntoView({ behavior: 'smooth' })
    }

    return(
        <div>
            <div className="suggestionsText">
                <Typography component="div" variant="h3">Playlist made for you</Typography>
                <Typography component="div" color="text.secondary" variant="h5">( Based on {mix.map(e=>e.data.name).join(',')})</Typography>
            </div>

            <Button variant="contained" onClick={generate}>
                Generate
                <QueueMusicIcon/>
            </Button>
            
            <List ref={ref} sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {results.map(e =>
                <ListItem key={e.id}>
                    <ListItemButton component="a" href={e.link} target="_blank">
                        <ListItemAvatar>
                            <Avatar variant="square" alt="img" src={e.img} />
                        </ListItemAvatar>
                        <ListItemText primary={e.name} secondary={e.artist} />
                    </ListItemButton>
                </ListItem>
                )}
            </List>
        </div>
    )
}

export default Suggestions