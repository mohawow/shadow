import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";



class TripsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
    // if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  componentDidMount() {
    console.log("Initiated:", auth.getCurrentUser());
    let user = auth.getCurrentUser();
    if (user) {

      this.setState({user});
    }
    
    
  }

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
        className="btn delete btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };


  render() {
    console.log('my user in the trip table: ', this.state.user);
    const { trips, onSort, sortColumn } = this.props;
    return (
      <div className="col content"> 
    
        {Object.keys(this.state.user).length === 0 ? 
          <h1> Nothing to display cause you're not logged in </h1>
          :
          <Table
            columns={[...this.columns, this.deleteColumn ]}
            data={trips}
            sortColumn={sortColumn}
            onSort={onSort}
          />

        }
      </div>

      
      
    );
        
  }
}


export default TripsTable;
