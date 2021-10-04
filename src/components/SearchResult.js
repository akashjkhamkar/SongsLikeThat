import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

import { Box, Tabs, AppBar, Tab } from "@mui/material"
import Cards from "./Cards";

import { notify } from "../reducers/notification";
import { actionResetResults } from "../reducers/results";
import { addMix } from "../reducers/mix";

const SearchResult = () => {
    const [tab, setTab] = useState(0);
    
    const mix = useSelector(state => state.mix)
    const search = useSelector(state => state.search)
    const dispatch = useDispatch()
    
    let songs = useSelector(state => state.songs)
    let artists = useSelector(state => state.artists)
    let loading = useSelector(state => state.loading)

    if(loading || !search){
      return null
    }else if(songs.length === 0){
      return "not found"
    }

    const addtoMix = (id, type) => {
      if(mix.length === 5){
        notify(dispatch, "Only 5 seeds (artists / songs can be) selected !")
        return
      }

      dispatch(actionResetResults())
      dispatch(addMix(songs, artists, type, id))
    }

    mix.forEach(e => {
      if(e.type === "song"){
        songs = songs.map(s => e.id === s.id ? {...s, added: true} : s)
      }else{
        artists = artists.map(s => e.id === s.id ? {...s, added: true} : s)
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