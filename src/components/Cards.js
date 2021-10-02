import { IconButton } from "@mui/material"

import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const Cards = ({items, addtoMix, className}) => {
return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {items.map(e => 
            <ListItem key={e.id} secondaryAction={
                <IconButton disabled={e.added} onClick={() => addtoMix(e.id, e.artist ? "song" : "artist")} edge="end" aria-label="delete">
                  {e.added ? <DoneIcon/> : <AddIcon />}
                </IconButton>
              }>
                <ListItemAvatar>
                    <Avatar variant="square" alt="img" src={e.img} />
                </ListItemAvatar>
                <ListItemText primary={e.name} secondary={e.artist} />
            </ListItem>
        )}
    </List>
    )
}
  
export default Cards;