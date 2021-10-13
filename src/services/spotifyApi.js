import axios from "axios"
import QueryString from "qs"

// dev creds
const clientId = "28e7d1cab8f8410fa52de2cdf79ee154"
const secret = "4595a1242a174cf3ae5deb9eeedf5391"
let token = null

// user creds
let userToken = null
let userRefreshToken = null
let code = null
let playlistId = null

const redirectUrl = window.location.origin + "/login";
const searchUrl = (query) => `https://api.spotify.com/v1/search?q=${query}&type=track%2Cartist&market=US&limit=15`;

const addToPlaylist = (songs) => {
    const tracks = songs.map(song => "spotify:track:" + song.id).join(",")
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${encodeURIComponent(tracks)}`
    return axios({
        method: 'post',
        url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${userToken}`
        }
    })
} 

const createPlaylist = (userid, name) => {
    const url = `https://api.spotify.com/v1/users/${userid}/playlists`
    
    const request = axios({
        method: 'post',
        url,
        data: JSON.stringify({
            name,
            description: "made using https://songs-like-that.vercel.app/",
            public: false
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${userToken}`
        }
    })

    return request.then(res => {
        playlistId = res.data.id
    })
}

const login = () => {
    var scopes = 'playlist-modify-private';
    const loginUrl = `https://accounts.spotify.com/en/authorize?response_type=token&client_id=28e7d1cab8f8410fa52de2cdf79ee154&redirect_uri=${encodeURIComponent(redirectUrl.trim())}&scope=${encodeURIComponent(scopes)}&show_dialog=true`
    window.location = loginUrl;
}

const refreshUserToken = () => {
    return axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: QueryString.stringify({
            grant_type: "refresh_token",
            refresh_token: userRefreshToken
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(clientId + ':' + secret).toString('base64')
        }
    })
}

const userDetails = (token) => {
    userToken = token
    const url = "https://api.spotify.com/v1/me";
    const request = axios.get(url,{ 
        "headers":{
        "Authorization" : `Bearer ${userToken}`
    }})

    return request.then(res => {
        return res.data;
    })
    .catch(e => {
        alert(e.response.data + "/ dev doesnt like you , buy him a chocolate of something")
        window.location = "/"
    })
}

const getUserToken = () => {
    const request = axios({
        method: 'post',
        url: `https://accounts.spotify.com/api/token`,
        data: QueryString.stringify({
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUrl
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(clientId + ':' + secret).toString('base64')
        }
    })

    return request.then(res => {
        userToken = res.data.access_token
        userRefreshToken = res.data.refresh_token
    }).catch(e => {
        alert("something went wrong, contact the dev")
        return e
    })

}

const init = () => {
    const request = axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: QueryString.stringify({
            grant_type: "client_credentials"
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(clientId + ':' + secret).toString('base64')
        }
    })

    return request.then(res => {
        token = res.data.access_token
        return res
    }).catch(e => {
        alert("something went wrong, contact the dev")
        return e
    })
}

const search = (query) => {
    const originalQuery = query
    query = encodeURIComponent(query.trim())
    if(!token){
        return
    }

    const request = axios.get(searchUrl(query), {
        "headers":{
            "Authorization" : `Bearer ${token}`
        }
    })

    return request.then(res => res.data)
    .catch(async e => {
        if(e.response.data.error.message === "The access token expired"){
            await init()
            return await search(originalQuery)
        }else{
            alert("something went wrong, try you luck by refreshing or contact the dev")
        }
    })
}

const recommend = async (mix) => {
    if(!token){
        return
    }

    const songs = []
    const artists = []

    mix.forEach(item => {
        if(item.type === "song"){
            songs.push(item.id)
        }else{
            artists.push(item.id)
        }
    })

    const seed_songs = "&seed_tracks=" + songs.join("%2C")
    const seed_artists = "&seed_artists=" + artists.join("%2C")
    
    let url = "https://api.spotify.com/v1/recommendations?limit=15&market=US"
    
    if(songs.length > 0){
        url += seed_songs
    }

    if(artists.length > 0){
        url += seed_artists
    }

    const res = axios.get(url, {
        "headers":{
            "Authorization" : `Bearer ${token}`
        }
    })

    return res.then(res => res.data)
    .catch(async e => {
        if(e.response.data.error.message === "The access token expired"){
            await init()
            return await recommend(mix)
        }else{
            alert("something went wrong !")
        }
    })
}

const obj = { search, init, recommend, login, getUserToken, userDetails, refreshUserToken, createPlaylist, addToPlaylist }
export default obj