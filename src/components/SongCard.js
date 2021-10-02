import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material"

const SongCard = ({id, name, artist, img, addtoMix, added}) => {
    return (
      <Card className="card" sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: "150px" }}
            image={img}
            alt="album cover"
          />
  
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardContent sx={{ flex: '1 0 auto'}}>
              <Typography className="cardName" component="div" variant="h6">
                {name}
              </Typography>
              
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {artist}
              </Typography>
            </CardContent>
            
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

              {
                added ? "added" : <button onClick={() => addtoMix(id, artist ? "song" : "artist")}>
                add
              </button>
              }
              
            </Box>
          </Box>
          
    </Card>)
}

export default SongCard;