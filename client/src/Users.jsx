import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deleteUser/' + id)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success mb-3">ADD +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>City</th> 
              <th>Date</th> 
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => {
                return <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td> 
                  <td>{new Date(user.date).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/update/${user._id}`} className="btn btn-success me-2">Update</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>;
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;