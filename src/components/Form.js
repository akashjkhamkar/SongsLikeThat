import { useState } from "react"
import { TextField } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const Form = ({ setSearch, loading, setLoading }) => {
    const [timerID, setTimerID] = useState(null)
  
    const handleSearch = (query) => {
      if(timerID){
        clearTimeout(timerID)
      }

      const id = setTimeout(() => {setSearch(query)}, 500)
      setTimerID(id)
      setLoading(true);
    }

    return (
        <form className="form">
          <TextField onChange={(e) => handleSearch(e.target.value)} name="search" label="search songs / artists" variant="standard" required/>
          {loading ? <CircularProgress/> : null }
        </form>
    )
}

export default Form;
  