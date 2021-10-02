import {Grid} from "@mui/material"
import SelectedCard from "./SelectedCard"
import Typography from '@mui/material/Typography';

const Selected = ({mix, setMix, songs, setSongs,  artists, setArtist}) => {

    if(mix.length === 0){
        return null
    }

    const removeFromMix = (id) => {
        const obj = mix.find(e => e.data.id === id)
        setMix(mix.filter(e => e.data.id !== id))

        obj.data.added = false;

        if(obj.type === "song"){
            setSongs(songs.map(e => e.id === id ? obj.data : e))
        }else{
            setArtist(artists.map(e => e.id === id ? obj.data : e))
        }
    }

    return (
        <div>
            <Typography variant="h3">Selected songs and artists</Typography>
            <Grid spacing={3} container className="selectedGrid">
            {
            mix.map(item =>
                <Grid item key={item.data.id}>
                <SelectedCard id={item.data.id} name={item.data.name} artist={!item.data.artist ? null : item.data.artist} img={item.data.img} removeFromMix={removeFromMix}/>
                </Grid>)
            }
            </Grid>
        </div>
    )
}

export default Selected