import { Typography } from "@mui/material";
import { useSelector } from 'react-redux'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { Paper, Button } from "@mui/material";

import spotifyService from "../services/spotifyApi"

const Suggestions = () => {
    const mix = useSelector(state => state.mix)
    const results = useSelector(state => state.results)

    if(results.length === 0){
        return null;
    }

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    return(
    <ThemeProvider theme={darkTheme}>
        <Paper className="playlist">
            <div className="suggestionsText">
                <Typography component="div" variant="h3"><span className="boldText madeForYou">Playlist made for you</span></Typography>
                <Typography className="subSuggestionText" component="div" variant="h5">( Based on {mix.map(e=>e.name).join(',')})</Typography>
                <Button variant="contained" onClick={spotifyService.login}>add to spotify</Button>
            </div>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
        </Paper>
    </ThemeProvider>
    )
}

export default Suggestions