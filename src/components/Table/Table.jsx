import React, { useEffect, useState } from "react";
import axios from "axios"

const Table = () => {
  const [users, setUsers] = useState([]);

  useEffect (() => {
    axios.get("https://randomuser.me/api/?results=50").then(response => {
      setUsers(response.data.results);
    })
  //  an empty dependency array inside useEffect mimics componentDidMount with out this it will call an infinite number of times.
  }, []);

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
        {users.map((user) => (
          <tr>
            <th scope="row">{user.id.value}</th>
            <td>
              <img src={user.picture.thumbnail} alt={user.name.first}></img>
            </td>
            <td>{user.name.first} {user.name.last}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
