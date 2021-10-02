import { useState } from "react"

import { Box, Tabs, AppBar, Tab } from "@mui/material"
import Cards from "./Cards";

const SearchResult = ({ mix, query, songs, artists, addtoMix }) => {
    const [tab, setTab] = useState(0);

    if(!query){
      return null
    }else if(songs.length === 0){
      return "not found"
    }


    mix.forEach(e => {
      if(e.type === "song"){
        songs = songs.map(s => e.data.id === s.id ? {...s, added: true} : s)
      }else{
        artists = artists.map(s => e.data.id === s.id ? {...s, added: true} : s)
      }
    })

    return (
      <Box className="searchComponent">
        <AppBar position="static" color="default">
            <Tabs
              value={tab}
              onChange={(e, val) => setTab(val)}  
            >
              <Tab label="tracks"/>
              <Tab label="artists"/>
            </Tabs>
        </AppBar>

        {tab === 0 ? 
        <Cards items={songs} addtoMix={addtoMix} className="grid"/>
        : <Cards items={artists} addtoMix={addtoMix} className="grid"/>}
        
     
      </Box> 
    )
}

  
  export default SearchResult;