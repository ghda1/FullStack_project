import PropTypes from "prop-types";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

function SortSelect({ setSortBy, setSortOrder }) {
  const { sortChoice } = useState();

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
          <MenuItem value={10}>Title: A - Z</MenuItem>
          <MenuItem value={20}>Title: Z - A</MenuItem>
          <MenuItem value={30}>Price: Low to High</MenuItem>
          <MenuItem value={40}>Price: High to Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

SortSelect.propTypes = {
  setSortBy: PropTypes.func,
  setSortOrder: PropTypes.func,
};

export default SortSelect;
