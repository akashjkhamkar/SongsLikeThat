import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import spotifyService from "../services/spotifyApi"

import { songsinitAction } from "../reducers/songs"
import { artistinitAction } from "../reducers/artists"
import { updateSearch } from "../reducers/search"
import { actionSetTrue, actionSetFalse } from "../reducers/loading"

import { itemArray } from "../utils/utils";

const SearchBar = () => {
  const [timerID, setTimerID] = useState(null)
  const search = useSelector(state => state.search)
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

    const id = setTimeout(() => {dispatch(updateSearch(query))}, 700)
    setTimerID(id)
    dispatch(actionSetTrue());
  }

  return (
      <form className="form" onSubmit={e => e.preventDefault()}>
        <input 
        placeholder="search"
        className="formInput" onChange={(e) => handleSearch(e.target.value)} name="search" required/>
      </form>
  )
}

export default SearchBar;
  