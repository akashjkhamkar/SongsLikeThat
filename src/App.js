import React from "react";
import { useState, useEffect } from "react";

import spotifyService from "./services/spotifyApi"

import { Container } from "@mui/material";

import Form from "./components/Form";
import SearchResult from "./components/SearchResult";
import Selected from "./components/Selected"
import Suggestions from "./components/Suggestions";

import { Paper } from "@mui/material";

const App = () => {
  const [search, setSearch] = useState("")
  let [songs, setSongs] = useState([])
  let [artists, setArtist] = useState([])
  const [mix, setMix] = useState([])
  const [loading, setLoading] = useState(true)

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

  const addtoMix = (id, type) => {
    const obj = {type}
    let original = null
    if(type === "song"){
      original = {...songs.find(song => song.id === id), added: true}
      setSongs(songs.map(song => song.id === id ? original : song))
    }else{
      original = {...artists.find(artist => artist.id === id), added: true}
      setArtist(artists.map(artist => artist.id === id ? original : artist))
    }

    obj.data = original
    setMix(mix.concat(obj))
  }

  return (
    <Container>
      <Form search={search} setSearch={setSearch} loading={loading} setLoading={setLoading}/> 

      <Paper>
          <Selected mix={mix} setMix={setMix} songs={songs} setSongs={setSongs} artists={artists} setArtist={setArtist}/>
      </Paper>

      <Paper>
          <SearchResult mix={mix} query={search} songs={songs} artists={artists} addtoMix={addtoMix} loading={loading}/>
      </Paper>         

      <Suggestions mix={mix}/>
    </Container>
  );
}

export default App;
