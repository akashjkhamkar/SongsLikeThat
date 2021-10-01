import { Switch, Link, Route } from "react-router-dom"
import { useState } from "react";

import { Box, Tabs, AppBar, Tab } from "@mui/material";

const SearchResult = ({query, songs, artists, addtoMix}) => {
    const [tab, setTab] = useState(0);
  
    if(songs.length === 0 && artists.length === 0 || !query){
      return null
    }
  
    return (
      <Box>
        <AppBar position="static" color="default">
            <Tabs
              value={tab}
              onChange={(e, val) => setTab(val)}  
            >
              <Tab label="tracks" component={Link} to="/tracks" />
              <Tab label="artists" component={Link} to="/artists" />
            </Tabs>
        </AppBar>
  
        <Switch>
            <Route path="/tracks">
                <div>
                songs - 
                {songs.map(song => <div key={song.id}>
                <img src={song.img}></img>
                  <a href={song.link}>{song.name} by {song.artist}</a>
                  <button onClick={() => addtoMix(song.id, "song", song.name)}>add</button>
                </div>)}
              </div>
            </Route>
            
            <Route path="/artists">
              <div>
                artists - 
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