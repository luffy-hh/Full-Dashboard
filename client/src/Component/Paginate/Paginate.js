import React from "react";
import ReactPaginate from "react-paginate";

function Paginate({ total, setPage, limit }) {
  const handlePageClick = (count) => {
    setPage(count.selected + 1);
  };
  return (
    <ReactPaginate
      previousLabel={"<<"}
      nextLabel={">>"}
      breakLabel={"..."}
      pageCount={Math.ceil(Number(total) / limit)}
      marginPagesDisplayed={3}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={"pagination justify-content-center mt-5"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
}

export default Paginate;
