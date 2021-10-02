import {Grid, Button} from "@mui/material"
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SelectedCard from "./SelectedCard"
import Typography from '@mui/material/Typography';
import spotifyService from "../services/spotifyApi"

const Selected = ({mix, setMix, songs, setSongs, setResults, artists, setArtist}) => {

    if(mix.length === 0){
        return null
    }

    const removeFromMix = (id) => {
        setResults([])
        const obj = mix.find(e => e.data.id === id)
        setMix(mix.filter(e => e.data.id !== id))

        obj.data.added = false;

        if(obj.type === "song"){
            setSongs(songs.map(e => e.id === id ? obj.data : e))
        }else{
            setArtist(artists.map(e => e.id === id ? obj.data : e))
        }
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
        document.querySelector(".playlist").scrollIntoView({ behavior: 'smooth' })
    }


    return (
        <div className="selectedDiv">
            <Typography variant="h3">
                <span className="boldText">Selected songs and artists</span>
                </Typography>
            
            <Grid spacing={3} container className="selectedGrid">
            {
                mix.map(item =>
                <Grid item key={item.data.id}>
                    <SelectedCard id={item.data.id} name={item.data.name} artist={!item.data.artist ? null : item.data.artist} img={item.data.img} removeFromMix={removeFromMix}/>
                </Grid>)
            }
            </Grid>

            <Button className="generate" variant="contained" onClick={generate}>
                Generate
                <QueueMusicIcon/>
            </Button>
            
        </div>
    )
}

export default Selected