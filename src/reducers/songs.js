const reducer = (state = [], action) => {
    switch(action.type){
        case "INIT_SONGS":
            return action.data;
        default:
            return state;
    }
}

export const songsinitAction = (songs) => {
    return  {
        type: "INIT_SONGS",
        data: songs
    }
}

export default reducer;