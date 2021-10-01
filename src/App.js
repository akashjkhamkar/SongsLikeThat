import React from "react";
import { useState, useEffect } from "react";

import spotifyService from "./services/spotifyApi"

import { Container } from "@mui/material";

import Form from "./components/Form";
import SearchResult from "./components/SearchResult";

const App = () => {
  const [search, setSearch] = useState("")
  const [songs, setSongs] = useState([])
  const [artists, setArtist] = useState([])
  const [mix, setMix] = useState([])

  useEffect(() => {
    spotifyService.init()
  }, [])

  const handleSearch = async (e) => {
      e.preventDefault()
      const res = await spotifyService.search(search)
      console.log(res);

      // setting songs
      const allSongs = res.tracks.items.map(song => {
          const name = song.name
          const link = song.external_urls.spotify
          const artist = song.artists[0].name
          const id = song.id
          const img = song.album.images[2].url;
          
          return {name, link, artist, id, img}
      })

      // setting artists
      const allArtists = res.artists.items.map(artist => {
        const name = artist.name;
        const link = artist.external_urls.spotify;
        const id = artist.id
      
        const obj = {name, link, id}

        if(artist.images.length > 0){
          obj.img = artist.images[2].url
        }

        return obj
      })
  
      setSongs(allSongs)
      setArtist(allArtists)
  }

  const addtoMix = (id, type) => {
    const obj = {type}
    if(type === "song"){
      obj.data = songs.find(song => song.id === id)
    }else{
      obj.data = artists.find(artist => artist.id === id)
    }
    setMix(mix.concat(obj))
  }

  const recommend = async () => {
      const res = await spotifyService.recommend(mix)
      console.log(res)
  }

  return (
    <Container>
      <Form handleSearch={handleSearch} search={search} setSearch={setSearch} /> 
      <SearchResult query={search} songs={songs} artists={artists} addtoMix={addtoMix}/>

    </Container>
  );
}

export default App;
