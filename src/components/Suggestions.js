import { useState } from "react";
import spotifyService from "../services/spotifyApi"

import {Grid} from "@mui/material"
import SuggestedCard from "./SuggestedCard"

const Suggestions = ({mix}) => {
    const [visible, setVisible] = useState(false)
    const [results, setResults] = useState([])
    
    const generate = async () => {
        const res = await spotifyService.recommend(mix)
        console.log(res);
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
        setVisible(true)
    }

    if(!visible){
        return <button onClick={generate}>generate</button>
    }

    return(
        <Grid spacing={3} container className="suggestedGrid">
        {
        results.map(item =>
            <Grid item key={item.id}>
            <SuggestedCard id={item.id} name={item.name} artist={item.artist} img={item.img}/>
            </Grid>)
        }
        </Grid>

    )
}

export default Suggestions