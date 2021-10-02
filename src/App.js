import React from "react";
import { useState, useEffect } from "react";

import spotifyService from "./services/spotifyApi"

import { Container } from "@mui/material";

import Form from "./components/Form";
import SearchResult from "./components/SearchResult";
import Selected from "./components/Selected"
import Suggestions from "./components/Suggestions";
import Notification from "./components/Notification"
import { Paper } from "@mui/material";

const App = () => {
  const [search, setSearch] = useState("")
  const [songs, setSongs] = useState([])
  const [artists, setArtist] = useState([])
  const [mix, setMix] = useState([])
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState([])
  const [notification, setNotification] = useState("")
  const [timerID, setTimerID] = useState("")

  useEffect(() => {
    spotifyService.init()
    setLoading(false)
  }, [])


  useEffect(() => {
    if(!search){
      setLoading(false)
      return
    }

    spotifyService.search(search).then(res => {
      if(!res){
        return
      }

      // setting songs
      let allSongs = res.tracks.items.map(song => {
          const name = song.name
          const link = song.external_urls.spotify
          const id = song.id

          const artist = song.artists[0].name
          const img = song.album.images[1].url;

          return {name, link, artist, id, img}
      })

      // setting artists
      let allArtists = res.artists.items.map(artist => {
        const name = artist.name;
        const link = artist.external_urls.spotify;
        const id = artist.id
      
        const obj = {name, link, id}

        if(artist.images.length > 0){
          obj.img = artist.images[2].url
        }

        return obj
      })

      setLoading(false)
      setSongs(allSongs)
      setArtist(allArtists)
    })

  }, [search])

  const notify = (msg) => {
    if(timerID){
      clearTimeout(timerID)
    }

    setNotification(msg)

    const id = setTimeout(() => {
      setNotification("")
    }, 4000)

    setTimerID(id)
    window.scrollTo({top:0, behavior: "smooth"})
  }

  const addtoMix = (id, type) => {
    if(mix.length === 5){
      notify("Only 5 seeds (artists / songs can be) selected !")
      return
    }

    setResults([])
    const obj = {type}
    let original = null
    if(type === "song"){
      original = songs.find(song => song.id === id)
    }else{
      original = artists.find(artist => artist.id === id)
    }

    obj.data = original
    setMix(mix.concat(obj))
  }

  return (
    <Container>
      <Notification className="notification" notification={notification}/>
      <Form search={search} setSearch={setSearch} loading={loading} setLoading={setLoading}/> 

      <Paper className="searchComponentContainer">
          <Selected mix={mix} setMix={setMix} songs={songs} setSongs={setSongs} setResults={setResults} artists={artists} setArtist={setArtist} setResults={setResults}/>
      </Paper>

      <Paper>
          <SearchResult mix={mix} query={search} songs={songs} artists={artists} addtoMix={addtoMix} loading={loading}/>
      </Paper>         

      <Suggestions mix={mix} results={results}/>
    </Container>
  );
}

export default App;
