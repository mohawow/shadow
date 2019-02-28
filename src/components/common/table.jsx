import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import "react-toastify/dist/ReactToastify.css";



const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
