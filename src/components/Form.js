import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import spotifyService from "../services/spotifyApi"

import { songsinitAction } from "../reducers/songs"
import { artistinitAction } from "../reducers/artists"
import { updateSearch } from "../reducers/search"
import { actionSetTrue, actionSetFalse } from "../reducers/loading"

import { itemArray } from "../utils/utils";

const Form = () => {
  const [timerID, setTimerID] = useState(null)
  const search = useSelector(state => state.search)
  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!search){
      dispatch(actionSetFalse());
      return
    }

    spotifyService.search(search).then(res => {
      if(!res){
        return
      }

      // setting songs
      let allSongs = itemArray(res.tracks.items, "song")

      // setting artists
      let allArtists = itemArray(res.artists.items, "artist")

      dispatch(songsinitAction(allSongs))
      dispatch(artistinitAction(allArtists))
      dispatch(actionSetFalse());
    })

  }, [search, dispatch])

  const handleSearch = (query) => {
    if(timerID){
      clearTimeout(timerID)
    }

    const id = setTimeout(() => {dispatch(updateSearch(query))}, 500)
    setTimerID(id)
    dispatch(actionSetTrue());
  }

  return (
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <TextField InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }} onChange={(e) => handleSearch(e.target.value)} name="search" label="search songs / artists" variant="filled" required/>
        {loading ? <CircularProgress/> : null }
      </form>
  )
}

export default Form;
  