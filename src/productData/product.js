import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./pagination";
import { useHistory, useLocation } from "react-router-dom";
import { Shortcuts } from "shortcuts";
const queryString = require("query-string");

const Product = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(
    queryString.parse(useLocation().search).pages || 1
  );
  const [totalPages, setTotalPages] = useState(0);
  const [pageLimit, setPageLimit] = useState(5);
  const limit = [5, 10, 15, 20];
  const startNumber = (currentPage - 1) * pageLimit;
  const selectedUsers = users.slice(startNumber, startNumber + pageLimit);

  const shortcuts = new Shortcuts();
  const loadProduct = async () => {
    await axios
      .get(`https://60ff90a3bca46600171cf36d.mockapi.io/api/products`)
      .then((response) => {
        setUsers(response.data);
        setTotalPages(Math.ceil(response.data.length / pageLimit));
      });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleClick = (num) => {
    setCurrentPage(num);
    history.push({
      pathname: "/product",
      search: `?pages=${num}`,
    });
  };
  shortcuts.add([
    {
      shortcut: "Ctrl+k",
      handler: () => {
        document.getElementById("search").focus();
        return true;
      },
    },
  ]);
  return (
    <>
      <div className="container my-3">
        <div className="my-4">
          <table className="table table-striped border">
            <thead>
              <tr>
                <th scope="col"> id</th>
                <th scope="col"> images</th>
                <th scope="col">name</th>
                <th scope="col"> Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedUsers &&
                selectedUsers.map((val, index) => (
                  <tr key={index}>
                    <th scope="row">{val.id}</th>
                    <th>
                      <img
                        style={{ width: "100px" }}
                        src={val.image}
                        alt="Card image cap"
                      />
                    </th>
                    <th>{val.name}</th>
                    <th>{val.price}</th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="my-3">
          <input
            id="search"
            type="text"
            className="select"
            placeholder="Search..   ALT+K"
          />
        </div>
        <div className="row">
          <div className="col col-4">
            <select
              className="select"
              onChange={(e) => setPageLimit(e.target.value)}
            >
              {limit.map((num) => (
                <option>{num}</option>
              ))}
            </select>
          </div>

          <div className="pagination justify-content-end">
            <Pagination
              data={users}
              totalPages={totalPages}
              handleClick={handleClick}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
