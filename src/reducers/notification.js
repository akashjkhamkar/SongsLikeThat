const reducer = (state = "", action) => {
    switch(action.type){
        case "NOTIFY_NEW":
            return action.data;
        case "NOTIFY_RESET":
            return "";
        default:
            return state;
    }
}

export const actionNotifyNew = (msg) => {
    return  {
        type: "NOTIFY_NEW",
        data: msg
    }
}

export const actionNotifyReset = () => {
    return  {
        type: "NOTIFY_RESET"
    }
}

let timerID

export const notify = (dispatch, msg) => {
    if(timerID){
      clearTimeout(timerID)
    }

    dispatch(actionNotifyNew(msg))

    timerID = setTimeout(() => {
      dispatch(actionNotifyReset())
    }, 4000)

    window.scrollTo({top:0, behavior: "smooth"})
  }

export default reducer;