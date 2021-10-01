import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material"

const SuggestedCard = ({id, name, artist, img}) => {
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
            </CardContent>
          </Box>
          
    </Card>)
}

export default SuggestedCard;