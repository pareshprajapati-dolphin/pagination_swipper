import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./pagination";

const Product = () => {
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = [5];
  const startNumber = (page - 1) * limit;
  const selectedUsers = users.slice(startNumber, startNumber + limit);

  const loadProduct = async () => {
    await axios
      .get(`https://60ff90a3bca46600171cf36d.mockapi.io/api/products`)
      .then((response) => {
        setUsers(response.data);
        setTotalPages(Math.ceil(response.data.length / limit));
      });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleClick = (num) => {
    setPage(num);
  };
  return (
    <>
      <div className="container-fluid">
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
      </div>
      <div className="pagination justify-content-end">
        <Pagination
          data={users}
          totalPages={totalPages}
          handleClick={handleClick}
          pageNeighbours={1}
        />
      </div>
    </>
  );
};
export default Product;
