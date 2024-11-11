import { Pagination } from "@mui/material";
import React from "react";
import { useContext } from "react";

import { ProductContext } from "../contexts/ProductContext";

function PaginationComponent({ pageNumber, setPagaeNumber, totalPages }) {


  const handleChangePage = (event, value) => {
    setPagaeNumber(value);
  };
  return (
    <div className="pagination">
      <Pagination
        count={totalPages}
        page={pageNumber}
        onChange={handleChangePage}
      />
    </div>
  );
}

export default PaginationComponent;
