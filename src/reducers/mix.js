const reducer = (state = [], action) => {
    switch(action.type){
        case "ADD_TO_MIX":
            // work on songs
            return state.concat(action.data);
        case "REMOVE_FROM_MIX":
            // work on songs 
            return state.filter(item => item.id !== action.data.id)
        default:
            return state;
    }
}

export const addMix = (songs, artists, type, id) => {
    let data = null
    if(type === "song"){
      data = songs.find(song => song.id === id)
    }else{
      data = artists.find(artist => artist.id === id)
    }

    return  {
        type: "ADD_TO_MIX",
        data
    }
}

export const removeMix = (id) => {
    return  {
        type: "REMOVE_FROM_MIX",
        data: {
            id
        }
    }
}

export default reducer;