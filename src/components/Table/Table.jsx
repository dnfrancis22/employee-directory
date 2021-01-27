import React from "react";

const Table = () => {
  return (
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Photo</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">20494740-S</th>
            <td><img src="https://randomuser.me/api/portraits/thumb/men/20.jpg"></img></td>
            <td>Diego Suarez</td>
            <td>diego.suarez@example.com</td>
            <td>674-541-603</td>
          </tr>
     
        </tbody>
      </table>
  );
};

export default Table;
