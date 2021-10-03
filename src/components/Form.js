import { useState } from "react"
import { TextField } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

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
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <TextField InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }} onChange={(e) => handleSearch(e.target.value)} name="search" label="search songs / artists" variant="filled" required/>
          {loading ? <CircularProgress/> : null }
        </form>
    )
}

export default Form;
  