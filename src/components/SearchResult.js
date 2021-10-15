import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

import { Tabs, AppBar, Tab } from "@mui/material"
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import ListItems from "./ListItems";

import { notify } from "../reducers/notification";
import { actionResetResults } from "../reducers/results";
import { addMix } from "../reducers/mix";
import { Paper } from "@mui/material";

const SearchResult = () => {
    const [tab, setTab] = useState(0);
    
    const mix = useSelector(state => state.mix)
    const search = useSelector(state => state.search)
    const dispatch = useDispatch()
    
    let songs = useSelector(state => state.songs)
    let artists = useSelector(state => state.artists)
    let loading = useSelector(state => state.loading)
    
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

    if(!search){
        return null  
    }else if(loading){
      return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    }else if(songs.length === 0){
      return <h3 className="notFound">not found :(</h3>
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
      <ThemeProvider theme={darkTheme}>
        <Paper className="searchComponentContainer">
          <div className="searchComponent">
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
            <ListItems items={songs} addtoMix={addtoMix} className="grid"/>
            : <ListItems items={artists} addtoMix={addtoMix} className="grid"/>}
            
          </div> 
        </Paper>
      </ThemeProvider>
    )
}

  
  export default SearchResult;