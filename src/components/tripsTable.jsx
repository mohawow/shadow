import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";


class TripsTable extends Component {
  columns = [
    {
      path: "block",
      label: "Block",
      content: trip => <Link to={`/trips/${trip._id}`}>{trip.block}</Link>
    },
    { path: "date", label: "Date" },
    { path: "shift.name", label: "Shift" },
    { path: "numberOfPackages", label: "Packages" },
    { path: "numberOfStops", label: "Stops" },
    { path: "initialPay", label: "Initial Pay" },
    { path: "finalPay", label: "Final Pay" },
    { path: "tips", label: "tips" },
    {
      key: "like",
      content: trip => (
        <Like liked={trip.liked} onClick={() => this.props.onLike(trip)} />
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: trip => (
      <button
        onClick={() => this.props.onDelete(trip)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user) this.columns.push(this.deleteColumn);
  }

  render() {
    const { trips, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={trips}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}


export default TripsTable;
