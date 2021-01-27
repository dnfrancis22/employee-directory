import React, { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const [sortDirection, setSortDirection] = useState(["asc"]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=50").then((response) => {
      setUsersToDisplay(response.data.results);
      setUsers(response.data.results);
    });
    //  an empty dependency array inside useEffect mimics componentDidMount with out this it will call an infinite number of times.
  }, []);
  // this handles the filtering by phone number once the submit button is click.
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredUsers = users.filter((user) => {
      return user.phone.includes(searchTerm);
    });

    setUsersToDisplay(filteredUsers);
  };
  // this handles the resetting the results from the filtered list to the original api call.
  const handleReset = () => {
    setUsersToDisplay(users);
  };

  // this is the default sort function. It calls sortByNameAsc or sortByNameDesc depending on the current state.
  const sortByName = () => {
    if (sortDirection === "asc") {
      sortByNameAsc();
      setSortDirection("desc");
    } else {
      sortByNameDesc();
      setSortDirection("asc");
    }
  };
  // this sorts the list by ascending order when you click on the name.
  const sortByNameAsc = () => {
    const tempUsers = [...users];
    const sortedUsers = tempUsers.sort((a, b) => {
      const aValue = a.name.first;
      const bValue = b.name.first;
      if (aValue > bValue) {
        return -1;
      }
      if (aValue < bValue) {
        return 1;
      }
      return 0;
    });
    console.log(sortedUsers);
    setUsersToDisplay(sortedUsers);
  };
  // this sorts the list by descending order if the order is already ascending.
  const sortByNameDesc = () => {
    const tempUsers = [...users];
    const sortedUsers = tempUsers.sort((a, b) => {
      const aValue = a.name.first;
      const bValue = b.name.first;
      if (aValue < bValue) {
        return -1;
      }
      if (aValue > bValue) {
        return 1;
      }
      return 0;
    });
    console.log(sortedUsers);
    setUsersToDisplay(sortedUsers);
  };
  // here we return the form field, buttons, and table.
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter phone number to filter"
            name="searchTerm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></input>
          <button className="btn btn-primary">Filter</button>
          <button
            className="btn btn-secondary"
            onClick={handleReset}
            type="button"
          >
            Reset
          </button>
        </form>
      </div>
      <div>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Photo</th>
              <th scope="col" onClick={sortByName}>
                Name
              </th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {usersToDisplay.map((user, index) => (
              <tr key={index}>
                <th scope="row">{user.id.value}</th>
                <td>
                  <img src={user.picture.thumbnail} alt={user.name.first}></img>
                </td>
                <td>
                  {user.name.first} {user.name.last}
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
// we export the component so we can import into app.js.
export default Table;
