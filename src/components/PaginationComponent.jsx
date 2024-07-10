import React from "react";
import { Pagination } from "@mui/material";

export default function PaginationComponent({ pageNumbers, page, handlePageChange }) {
  return <Pagination count={pageNumbers} page={page} size="small" onChange={handlePageChange} />;
}
