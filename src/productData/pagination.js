import React from "react";
import "./pagination.css";

function Pagination({ totalPages, handleClick, currentPage }) {
  function goToNextPage() {
    let num = currentPage + 1;
    handleClick(num);
  }

  function goToPreviousPage() {
    let num = currentPage - 1;
    handleClick(num);
  }

  function changePage(num) {
    // const pageNumber = Number(event.target.textContent);

    handleClick(num);
  }

  const renderPage = (page, total) => {
    if (page % 5 >= 0 && page > 4 && page + 2 < total) {
      return [1, "---", page - 1, page, page + 1, "---", total];
    } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
      return [1, "---", total - 3, total - 2, total - 1, total];
    } else {
      return [1, 2, 3, 4, "---", total];
    }
  };

  return (
    <>
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>
        {renderPage(currentPage, totalPages).map((number) => {
          console.log(number);
          return (
            <button
              key={number}
              className={`paginationItem ${
                currentPage === number ? "active" : null
              }`}
              onClick={() => changePage(number)}
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
