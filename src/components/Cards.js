import SongCard from "../components/SongCard"
import {Grid} from "@mui/material"

const Cards = ({items, addtoMix, className}) => {
return (
    <Grid spacing={3} container className={className}>
    {
    items.map(item =>
        <Grid item key={item.id}>
        <SongCard id={item.id} name={item.name} artist={!item.artist ? null : item.artist} img={item.img} addtoMix={addtoMix} added={item.added}/>
        </Grid>)
    }
    </Grid>
    )
}
  
export default Cards;