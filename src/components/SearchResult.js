import { useState } from "react"

import { Box, Tabs, AppBar, Tab } from "@mui/material"
import Cards from "./Cards";

const SearchResult = ({ songs, artists, addtoMix }) => {
    const [tab, setTab] = useState(0);

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