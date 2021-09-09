import React, { useState } from "react";
import "./pagination.css";

function Pagination({ totalPages, handleClick, pageNeighbours }) {
  const [currentPage, setCurrentPage] = useState(1);

  const LEFT = " left";
  const RIGHT = " right";

  function goToNextPage() {
    let page = currentPage + 1;
    setCurrentPage(page);
    handleClick(page);
  }

  function goToPreviousPage() {
    let page = currentPage - 1;
    setCurrentPage(page);
    handleClick(page);
  }

  function changePage(num) {
    // const pageNumber = Number(event.target.textContent);
    setCurrentPage(num);
    handleClick(num);
  }
  const range = (from, to, step = 1) => {
    let i = from;
    let range = [];

    if (from < 3) {
      return (range = [2, 3, 4]);
    }
    while (i <= to) {
      range.push(i);
      i += step;
    }
    console.log(range);
    return range;
  };

  const renderPage = () => {
    const totalNumbers = pageNeighbours * 2 + 1;
    const totlaBlock = totalNumbers + 1;
    if (totalPages > totlaBlock) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      console.log("start page=", startPage);
      console.log("the end page ===", endPage);

      let pages = range(startPage, endPage);

      const leftPage = startPage > 2;
      const Rigthpage = totalPages - endPage > 1;
      const spli = totalNumbers - (pages.length + 1);

      if (leftPage && !Rigthpage) {
        console.log("exatraaaa");
        const extraPage = range(startPage - spli, startPage - 1);
        pages = [LEFT, ...extraPage, ...pages];
      } else if (leftPage && Rigthpage) {
        pages = [LEFT, ...pages, RIGHT];
      } else {
        pages = [...pages, RIGHT];
      }

      return [1, ...pages, totalPages];
    }
  };

  const pages = renderPage() || [];

  return (
    <>
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>
        {pages.map((number) => {
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
