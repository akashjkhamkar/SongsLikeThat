import React from "react";
import { useState, useEffect } from "react";

import spotifyService from "./services/spotifyApi"

import { Container } from "@mui/material";

import Form from "./components/Form";
import SearchResult from "./components/SearchResult";
import Selected from "./components/Selected"
import Suggestions from "./components/Suggestions";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
      if(!res){
        return
      }
      // setting songs
      const allSongs = res.tracks.items.map(song => {
          const name = song.name.substring(0,35)
          const link = song.external_urls.spotify
          const artist = song.artists[0].name
          const id = song.id
          const img = song.album.images[1].url;
          const added = mix.find(e => e.data.id === id) != null;

          return {name, link, artist, id, img, added}
      })

      // setting artists
      const allArtists = res.artists.items.map(artist => {
        const name = artist.name;
        const link = artist.external_urls.spotify;
        const id = artist.id
      
        const added = mix.find(e => e.data.id === id) != null;
        const obj = {name, link, id, added}

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

  const recommend = async () => {
      const res = await spotifyService.recommend(mix)
      console.log(res)
  }

  return (
    <Container>
      <Form handleSearch={handleSearch} search={search} setSearch={setSearch} /> 
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Search Results</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
      
      <SearchResult query={search} songs={songs} artists={artists} addtoMix={addtoMix}/>
      <hr></hr>
      <Selected mix={mix} setMix={setMix} songs={songs} setSongs={setSongs} artists={artists} setArtist={setArtist}/>
      <hr></hr>
      <Suggestions mix={mix}/>
    </Container>
  );
}

export default App;
