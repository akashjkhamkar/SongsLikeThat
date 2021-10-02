import { Typography } from "@mui/material";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';

const Suggestions = ({mix, results, setResults}) => {
    if(results.length === 0){
        return null;
    }else if(mix.length === 0){
        setResults([])
    }

    return(
        <div>
            <div className="suggestionsText">
                <Typography component="div" variant="h3"><span className="boldText">Playlist made for you</span></Typography>
                <Typography component="div" color="text.secondary" variant="h5">( Based on {mix.map(e=>e.data.name).join(',')})</Typography>
            </div>

            <List className="playlist" sx={{ width: '100%', bgcolor: 'background.paper' }}>
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