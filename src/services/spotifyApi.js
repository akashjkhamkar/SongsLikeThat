import axios from "axios"
import QueryString from "qs"

const clientId = "28e7d1cab8f8410fa52de2cdf79ee154"
const secret = "4595a1242a174cf3ae5deb9eeedf5391"
let token = null
let userToken = null
let code = null
const redirectUrl = "http://localhost:3000/login"
const searchUrl = (query) => `https://api.spotify.com/v1/search?q=${query}&type=track%2Cartist&market=US&limit=15`;

const setCode = (c) => {
    code = c;
}

const loginUrl = `https://accounts.spotify.com/en/authorize?response_type=code&client_id=28e7d1cab8f8410fa52de2cdf79ee154&redirect_uri=${encodeURIComponent(redirectUrl.trim())}`
const login = () => {
    window.location = loginUrl;
}

const userDetails = () => {
    const url = "https://api.spotify.com/v1/me";
    const request = axios.get(url,{ 
        "headers":{
        "Authorization" : `Bearer ${userToken}`
    }})

    return request.then(res => {
        console.log("2. fetched userData", res.data);
        return res.data;
    })
}

const refreshUser = () => {
    const request = axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
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
        console.log("1. fetched user token", userToken)
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
        console.log("fetched")
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
        console.log("no token")
        return
    }

    const request = axios.get(searchUrl(query), {
        "headers":{
            "Authorization" : `Bearer ${token}`
        }
    })

    return request.then(res => res.data)
    .catch(async e => {
        console.log(e)
        if(e.response.data.error.message === "The access token expired"){
            console.log("getting token again, inside the block")
            await init()
            return await search(originalQuery)
        }else{
            alert("something went wrong, try you luck by refreshing or contact the dev")
        }
    })
}

const recommend = async (mix) => {
    if(!token){
        console.log("no token")
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
    
    let url = "https://api.spotify.com/v1/recommendations?limit=10&market=US"
    
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
            console.log("getting token again, inside the block")
            await init()
            return await recommend(mix)
        }else{
            alert("something went wrong !")
        }
    })
}

const obj = { search, init, recommend, login, setCode, refreshUser, userDetails }
export default obj