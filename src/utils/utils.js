export const itemArray = (res, type) => {
    return res.map(item => {

        const obj = {}
        obj.name = item.name
        obj.link = item.external_urls.spotify
        obj.id = item.id

        if(item.artists){
            obj.artist = item.artists[0].name
        }

        if(type === "artist" && item.images.length > 0){
            obj.img = item.images[1].url
        }else if(type === "song"){
            obj.img = item.album.images[1].url
        }
  
        obj.type = type
        return obj
    })
}