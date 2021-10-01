import axios from "axios"
import QueryString from "qs"

const clientId = "28e7d1cab8f8410fa52de2cdf79ee154"
const secret = "4595a1242a174cf3ae5deb9eeedf5391"
let token = null

const searchUrl = (query) => `https://api.spotify.com/v1/search?q=${query}&type=track%2Cartist&market=US&limit=15`;

const init = async () => {
    const res = await axios({
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

    token = res.data.access_token
    console.log(res, token)
}

const search = async (query) => {
    query = encodeURIComponent(query.trim())
    if(!token){
        console.log("no token")
        return
    }
    const res = await axios.get(searchUrl(query), {
        "headers":{
            "Authorization" : `Bearer ${token}`
        }
    })

    return res.data
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

    const res = await axios.get(url, {
        "headers":{
            "Authorization" : `Bearer ${token}`
        }
    })

    return res.data
}

export default { search, init, recommend }