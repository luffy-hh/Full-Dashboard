import React from "react";
import ReactPaginate from "react-paginate";
import { fetGetTransationRecord } from "../../Feactures/apiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";

function PaginateForLog({ gameapi, total, limit }) {
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const handlePageClick = (count) => {
    dispatch(
      fetGetTransationRecord({
        api: `${gameapi}&page=${count.selected + 1}&limit=10`,
        accessToken,
      })
    );
  };
  return (
    <ReactPaginate
      previousLabel={"<<"}
      nextLabel={">>"}
      breakLabel={"..."}
      pageCount={Math.ceil(total / limit)}
      marginPagesDisplayed={3}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={"pagination justify-content-center mt-2"}
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

export default PaginateForLog;
