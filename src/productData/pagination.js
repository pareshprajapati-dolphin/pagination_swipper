import React from "react";
import "./pagination.css";

const LEFT = "left";
const RIGHT = "right";

function Pagination({ totalPages, handleClick, currentPage }) {
  const goToNextPage = () => {
    let num = currentPage + 1;
    handleClick(num);
  };

  const goToPreviousPage = () => {
    let num = currentPage - 1;
    handleClick(num);
  };
  const filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter((page) => page <= totalPages);
  };

  const renderPage = (page, total) => {
    console.log(page);
    if (total < 6) {
      return filterPages([1, 2, 3, 4], total);
    } else {
      if (page % 4 >= 0 && page > 3 && page + 2 < total) {
        return [1, LEFT, page - 1, page, page + 1, RIGHT, total];
      } else if (page % 4 >= 0 && page > 3 && page + 2 >= total) {
        return [1, LEFT, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, RIGHT, total];
      }
    }
  };

  const paginationPage = renderPage(currentPage, totalPages) || [];

  return (
    <>
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>
        {paginationPage.map((number) => {
          if (number === LEFT)
            return <li className="paginationItem_1"> &hellip; </li>;

          if (number === RIGHT)
            return <li className="paginationItem_1"> &hellip; </li>;

          return (
            <button
              key={number}
              className={`paginationItem ${
                currentPage === number ? "active" : null
              }`}
              onClick={() => handleClick(number)}
            >
              {number}
            </button>
          );
        })}

        <button
          onClick={goToNextPage}
          className={`next ${currentPage === totalPages ? "disabled" : ""}`}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Pagination;
