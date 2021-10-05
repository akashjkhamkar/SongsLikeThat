import React from "react";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'

import spotifyService from "./services/spotifyApi"

import { Container } from "@mui/material";
import { Paper } from "@mui/material";

import Form from "./components/Form";
import SearchResult from "./components/SearchResult";
import Selected from "./components/Selected"
import Suggestions from "./components/Suggestions";
import Notification from "./components/Notification"

import { actionSetFalse } from "./reducers/loading";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    spotifyService.init()
    .then(res => {
      console.log("stopped")
      dispatch(actionSetFalse())
    })
    
  }, [dispatch])

  return (
    <Container className="megaContainer">
      <Notification className="notification"/>
      <Form /> 

      <Paper className="searchComponentContainer">
          <Selected />
      </Paper>

      <Paper>
          <SearchResult/>
      </Paper>         

      <Suggestions />
    </Container>
  );
}

export default App;
