const reducer = (state = true, action) => {
    switch(action.type){
        case "SET_TRUE":
            return true;
        case "SET_FALSE":
            return false;
        default:
            return state;
    }
}

export const actionSetTrue = () => {
    return  {
        type: "SET_TRUE"
    }
}

export const actionSetFalse = () => {
    return  {
        type: "SET_FALSE"
    }
}

export default reducer;