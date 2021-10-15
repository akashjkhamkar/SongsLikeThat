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
  const [searchLocal, setsearchLocal] = useState("")
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

  const doSearch = (query) => {
    console.log("searching ", query)
    if(timerID){
      clearTimeout(timerID)
    }

    const id = setTimeout(() => {dispatch(updateSearch(query))}, 700)
    setTimerID(id)
    dispatch(actionSetTrue());
  }

  const handleSearch = (e, query) => {
    e.preventDefault()
    setsearchLocal(query)
    doSearch(query)
  }

  return (
      <div className="form">
        <input
        value={searchLocal} 
        placeholder="search"
        className="formInput" 
        onKeyUp={(e) => e.keyCode === 13 ? e.target.blur() : null}
        onChange={(e) => handleSearch(e, e.target.value)} name="search" required/>
      </div>
  )
}

export default SearchBar;
  