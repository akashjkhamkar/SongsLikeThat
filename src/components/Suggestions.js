import { Typography } from "@mui/material";
import { useSelector } from 'react-redux'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';

const Suggestions = () => {
    const mix = useSelector(state => state.mix)
    const results = useSelector(state => state.results)

    if(results.length === 0){
        return null;
    }

    return(
        <div className="playlist">
            <div className="suggestionsText">
                <Typography component="div" variant="h3"><span className="boldText">Playlist made for you</span></Typography>
                <Typography component="div" color="text.secondary" variant="h5">( Based on {mix.map(e=>e.name).join(',')})</Typography>
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
        </div>
    )
}

export default Suggestions