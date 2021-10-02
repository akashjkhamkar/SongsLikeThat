import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';

const Form = ({handleSearch, search, setSearch, loading, setLoading }) => {
    const handleSearch2 = (e) => {
      setLoading(true);
      handleSearch(e);
    }

    return (
        <form className="form" onSubmit={handleSearch2}>
          <TextField value={search} onChange={(e) => setSearch(e.target.value)} name="search" label="search songs / artists" variant="standard" required/>
            {loading ? <CircularProgress/> : 
            <IconButton type="submit" variant="contained" className="searchButton">
              <SearchIcon/>
            </IconButton>}
        </form>
    )
}

export default Form;
  