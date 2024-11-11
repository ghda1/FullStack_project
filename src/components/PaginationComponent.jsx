import { Pagination } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

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
PaginationComponent.propTypes = {
  pageNumber: PropTypes.number,
  setPagaeNumber: PropTypes.func,
  totalPages: PropTypes.number,
};
export default PaginationComponent;
