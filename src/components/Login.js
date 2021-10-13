import { useLocation, useHistory, Redirect } from "react-router-dom"
import { useDispatch } from "react-redux";
import spotifyService from "../services/spotifyApi"
import { setUser } from "../reducers/user"
import { notify } from "../reducers/notification";
const Login = () => {
    const code = new URLSearchParams(useLocation().search).get("code");
    const history = useHistory();
    const dispatch = useDispatch();
    const playlist = JSON.parse(localStorage.getItem("playlist"))

    if(!code){
        return <Redirect to="/"/>
    }

    spotifyService.setCode(code)
    
    spotifyService.getUserToken()
    .then(() => spotifyService.userDetails())
    .then(userData => {
        console.log("dispatching userdata")
        dispatch(setUser(userData));

        // adding songs to users ac
        console.log(playlist);
        return spotifyService.createPlaylist(userData.id, playlist.name)
    })
    .then(() => {
        console.log("playlist is created hopefully")
        return spotifyService.addToPlaylist(playlist.songs)
    })
    .then(() => {
        notify(dispatch, "playlist successfully added !")
        history.push('/')
    })

    return null;
}

export default Login;