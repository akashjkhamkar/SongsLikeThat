const reducer = (state = null, action) => {
    switch(action.type){
        case "SET_USER":
            return action.data;
        default:
            return state;
    }
}

export const setUser = (user) => {
    return  {
        type: "SET_USER",
        data: user
    }
}

export default reducer;