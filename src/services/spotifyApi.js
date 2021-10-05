import axios from "axios"
import QueryString from "qs"

const clientId = "28e7d1cab8f8410fa52de2cdf79ee154"
const secret = "4595a1242a174cf3ae5deb9eeedf5391"
let token = "BQCBSUYm7DhV2or5ZBOID_YrEZVsvNWTpnxGJKDOLFKLkqqKzYtMqIgITFfWTvnHeR_uIj6kA628g4hjftMnQQhSIW7iZpS8iqctViWkMUS5BbyXabh54sITQcAIUPN3AXws3_J9Lmq0LhykeoR5F88JmwXKFy9mOxG67RnBvtE"

const searchUrl = (query) => `https://api.spotify.com/v1/search?q=${query}&type=track%2Cartist&market=US&limit=15`;

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

const obj = { search, init, recommend }
export default obj