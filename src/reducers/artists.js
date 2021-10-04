const reducer = (state = [], action) => {
    switch(action.type){
        case "INIT_ARTISTS":
            return action.data;
        default:
            return state;
    }
}

export const artistinitAction = (artists) => {
    return  {
        type: "INIT_ARTISTS",
        data: artists
    }
}

export default reducer;