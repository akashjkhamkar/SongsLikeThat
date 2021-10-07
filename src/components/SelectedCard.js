import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material"

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material"

const SelectedCard = ({id, name, artist, img, removeFromMix}) => {
    return (
      <Card className="card" sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: "150px" }}
            image={img}
            alt="album cover"
          />
  
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
          

              <Typography className="cardName" component="div" variant="h6">
                {name}
              </Typography>
              
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {artist}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton onClick={() => removeFromMix(id)}>
                  <DeleteIcon>remove</DeleteIcon>
                </IconButton>
              </Box>
          
            </CardContent>
          </Box>

    </Card>)
}

export default SelectedCard;