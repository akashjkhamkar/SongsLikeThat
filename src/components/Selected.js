import {Grid, Button} from "@mui/material"
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SelectedCard from "./SelectedCard"
import Typography from '@mui/material/Typography';
import spotifyService from "../services/spotifyApi"
import { Paper } from "@mui/material";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { songsinitAction } from "../reducers/songs"
import { artistinitAction } from "../reducers/artists"
import { actionResetResults, actionUpdateResults } from "../reducers/results";
import { removeMix } from "../reducers/mix";

import { itemArray } from "../utils/utils";

const Selected = () => {
    const dispatch = useDispatch()
    const songs = useSelector(state => state.songs)
    const artists = useSelector(state => state.artists)
    const mix = useSelector(state => state.mix)

    if(mix.length === 0){
        return null
    }

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });
  
    const removeFromMix = (id) => {
        const obj = mix.find(e => e.id === id)
    
        dispatch(removeMix(id))
        dispatch(actionResetResults())

        obj.added = false;

        if(obj.type === "song"){
            dispatch(songsinitAction(songs.map(e => e.id === id ? obj : e)))
        }else{
            dispatch(artistinitAction(artists.map(e => e.id === id ? obj : e)))
        }
    }

    const generate = async () => {
        const res = await spotifyService.recommend(mix)
        const allSongs = itemArray(res.tracks, "song")
        console.log(allSongs)

        const playlist = {
            songs: allSongs,
            name: mix.map(e => e.name).join(',') + " mix"
        }
        
        localStorage.setItem('playlist', JSON.stringify(playlist))

        dispatch(actionUpdateResults(allSongs))
        document.querySelector(".playlist").scrollIntoView({ behavior: 'smooth' })
    }


    return (
    <ThemeProvider theme={darkTheme}>
        <Paper className="searchComponentContainer">
            <div className="selectedDiv">
                <Typography variant="h3">
                    <span className="boldText">Selected</span>
                    </Typography>
                
                <Grid spacing={1} container className="selectedGrid">
                {
                    mix.map(item =>
                    <Grid item key={item.id}>
                        <SelectedCard id={item.id} name={item.name} artist={!item.artist ? null : item.artist} img={item.img} removeFromMix={removeFromMix}/>
                    </Grid>)
                }
                </Grid>

                <Button className="generate" variant="contained" onClick={generate}>
                    Generate
                    <QueueMusicIcon/>
                </Button>
                
            </div>
        </Paper>
    </ThemeProvider>

    )
}

export default Selected