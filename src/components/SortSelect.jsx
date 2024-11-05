import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useState } from "react";

import { ProductContext } from "../contexts/ProductContext";

function SortSelect() {
  const { setSortBy, setSortOrder } = useContext(ProductContext);

  const { sortChoice, setSortChoice } = useState();

  const handleChange = (event) => {
    const choiceValue = event.target.value;
    if (choiceValue == 10) {
      setSortBy("title");
      setSortOrder("asc");
    }
    if (choiceValue == 20) {
      setSortBy("title");
      setSortOrder("desc");
    }
    if (choiceValue == 30) {
      setSortBy("price");
      setSortOrder("asc");
    }
    if (choiceValue == 40) {
      setSortBy("price");
      setSortOrder("desc");
    }
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
        <InputLabel id="sort-label">Sort Product</InputLabel>
        <Select
          className="sorting"
          labelId="sort-label"
          id="sort-select"
          value={sortChoice}
          label="sorting"
          onChange={handleChange}
        >
          <MenuItem value={10}>A - Z</MenuItem>
          <MenuItem value={20}>Z - A</MenuItem>
          <MenuItem value={30}>Price: Low to High</MenuItem>
          <MenuItem value={40}>Price: High to Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SortSelect;
