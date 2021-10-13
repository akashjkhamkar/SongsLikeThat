import { useLocation, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import spotifyService from "../services/spotifyApi"
import { setUser } from "../reducers/user"

const Login = () => {
    const code = new URLSearchParams(useLocation().search).get("code");
    const history = useHistory();
    const dispatch = useDispatch();

    spotifyService.setCode(code)
    
    spotifyService.refreshUser()
    .then(() => spotifyService.userDetails())
    .then(userData => {
        console.log("dispatching userdata")
        dispatch(setUser(userData));
        history.push('/')
    })

    return null;
}

export default Login;