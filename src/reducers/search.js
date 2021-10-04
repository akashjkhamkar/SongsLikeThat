const reducer = (state = "", action) => {
    switch(action.type){
        case "UPDATE_SEARCH":
            return action.data;
        default:
            return state;
    }
}

export const updateSearch = (query) => {
    return  {
        type: "UPDATE_SEARCH",
        data: query
    }
}

export default reducer;