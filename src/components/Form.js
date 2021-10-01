import { TextField, Button } from "@mui/material";
const Form = ({handleSearch, search, setSearch }) => {
    return (
    <form onSubmit={handleSearch}>
      <TextField value={search} onChange={(e) => setSearch(e.target.value)} name="search" id="outlined-basic" label="search songs / artists" variant="outlined" />
      <Button type="submit" variant="contained">Search</Button>
    </form>
    )
}

export default Form;
  