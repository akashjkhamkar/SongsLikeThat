import React from "react";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'

import spotifyService from "./services/spotifyApi"

import Form from "./components/Form";
import SearchResult from "./components/SearchResult";
import Selected from "./components/Selected"
import Suggestions from "./components/Suggestions";
import Notification from "./components/Notification"

import { actionSetFalse } from "./reducers/loading";
import Greeter from "./components/Greeter";

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
    <div className="megaContainer">
      <div className="subContainer">
        <Notification className="notification"/>
        <Greeter/>
        <Form /> 

        <Selected />

        <SearchResult />

        <Suggestions />
      </div>
    </div>
  );
}

export default App;
