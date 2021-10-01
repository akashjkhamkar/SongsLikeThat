import { Switch, Link, Route } from "react-router-dom"
import { useState } from "react"

import { Box, Tabs, AppBar, Tab, Card, CardContent, Typography, CardMedia, Grid } from "@mui/material"
import PersonPinIcon from '@mui/icons-material/PersonPin';

const SongCard = ({name, artist, img, addtoMix}) => {
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
            <Typography component="div" variant="h5">
              {name}
            </Typography>
            
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {artist}
            </Typography>
          </CardContent>
          
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            add
          </Box>
        </Box>
        
      </Card>)
}

const SearchResult = ({query, songs, artists, addtoMix}) => {
    const [tab, setTab] = useState(0);
  
    if((songs.length === 0 && artists.length === 0) || !query){
      return null
    }
  
    return (
      <Box className="searchComponent">
        <AppBar position="static" color="default">
            <Tabs
              value={tab}
              onChange={(e, val) => setTab(val)}  
            >
              <Tab label="tracks" component={Link} to="/tracks" />
              <Tab icon={<PersonPinIcon />} label="artists" component={Link} to="/artists" />
            </Tabs>
        </AppBar>
  
        <Switch>
            <Route path="/tracks">
                <Grid spacing={3} container className="tracks">
                  {
                    songs.map(song =>
                      <Grid item>
                        <SongCard name={song.name} artist={song.artist} img={song.img} addtoMix={addtoMix}/>
                      </Grid>)
                  }
                </Grid>
              </Route>
            
            <Route path="/artists">
              <div className="artists">
                {artists.map(artist => <div key={artist.id}>
                <img src={artist.img}></img>
                  <a href={artist.link}>{artist.name}</a>
                  <button onClick={() => addtoMix(artist.id, "artist", artist.name)}>add</button>
                </div>)}
              </div>          
            </Route>
            
        </Switch>
  
      </Box>
    )
}

  
  export default SearchResult;