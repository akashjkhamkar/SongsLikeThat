import { TextField, Button, Box } from "@mui/material";

const hideResults = () => {
    document.querySelector(".searchComponent").style.visibility = "hidden"
}

const showResults = () => {
  document.querySelector(".searchComponent").style.visibility = "visible"
  // show loading icon and lock the search button until content is loaded
}

const Form = ({handleSearch, search, setSearch }) => {
    return (
        <form className="form" onSubmit={handleSearch}>
          <TextField value={search} onClick={hideResults} onChange={(e) => setSearch(e.target.value)} name="search" id="outlined-basic" label="search songs / artists" variant="outlined" />
          <Button type="submit" onClick={showResults} variant="contained">Search</Button>
        </form>
    )
}

export default Form;
  