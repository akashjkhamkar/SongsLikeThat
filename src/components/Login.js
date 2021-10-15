import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import spotifyService from "../services/spotifyApi"
import { setUser } from "../reducers/user"
import { notify } from "../reducers/notification";
const Login = () => {
    var hash = window.location.hash.substring(1);
    var accessString = hash.indexOf("&");

    const token = hash.substring(13, accessString);

    const loading = useSelector(state => state.loading)
    const history = useHistory();
    const dispatch = useDispatch();
    const playlist = JSON.parse(localStorage.getItem("playlist"))

    if(!token || !loading){
        return null
    }

    spotifyService.userDetails(token)
    .then(userData => {
        dispatch(setUser(userData));
        return spotifyService.createPlaylist(userData.id, playlist.name)
    })
    .then(() => {
        return spotifyService.addToPlaylist(playlist.songs)
    })
    .then(() => {
        notify(dispatch, "playlist successfully added !")
        history.push('/')
    })

    return null;
}

export default Login;