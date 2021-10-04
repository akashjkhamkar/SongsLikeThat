const reducer = (state = [], action) => {
    switch(action.type){
        case "UPDATE_RESULTS":
            return action.data;
        case "RESET_RESULTS":
            return [];
        default:
            return state;
    }
}

export const actionUpdateResults = (results) => {
    return  {
        type: "UPDATE_RESULTS",
        data: results
    }
}

export const actionResetResults = () => {
    return  {
        type: "RESET_RESULTS"
    }
}

export default reducer;