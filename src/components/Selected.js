import {Grid} from "@mui/material"
import SelectedCard from "./SelectedCard"

const Selected = ({mix, setMix, songs, setSongs,  artists, setArtist}) => {

    const removeFromMix = (id) => {
        const obj = mix.find(e => e.data.id === id)
        setMix(mix.filter(e => e.id !== id))

        obj.data.added = false;

        if(obj.type === "song"){
            setSongs(songs.map(e => e.id === id ? obj.data : e))
        }else{
            setArtist(artists.map(e => e.id === id ? obj.data : e))
        }
    }

    return (
        <div>
            Selected songs and artists 
            <Grid spacing={3} container className="selectedGrid">
            {
            mix.map(item =>
                <Grid item key={item.data.id}>
                <SelectedCard id={item.data.id} name={item.data.name} artist={!item.data.artist ? null : item.artist} img={item.data.img} removeFromMix={removeFromMix}/>
                </Grid>)
            }
            </Grid>
        </div>
    )
}

export default Selected