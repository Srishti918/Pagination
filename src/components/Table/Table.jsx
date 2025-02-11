import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import "./Table.css";
const Table = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const maxRecords = 10;
  const lastIndex = currentPage * maxRecords;
  const firstIndex = lastIndex - maxRecords;
  const usersPerPage = users.slice(firstIndex, lastIndex);
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / maxRecords);
  const fetchUsers = async () => {
    try {
      let res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUsers(res.data);
    } catch (error) {
      alert("failed to fetch data");
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (totalPages < currentPage && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [totalPages]);

  return (
    <>
      <div className="container">
        <h1>Employee Data Table</h1>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          </thead>
          <tbody>
          {usersPerPage.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
            
          ))}
          </tbody>
        </table>
        <Pagination
          updatePage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default Table;
