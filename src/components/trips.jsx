import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TripsTable from "./tripsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getTrips, deleteTrip } from "../services/tripService";
import { getShifts } from "../services/shiftService";
import  {paginate}  from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";


class Trips extends Component {
  state = {
    trips: [],
    shifts: [],
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
    selectedShift: null,
    sortColumn: { path: "block", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getShifts();
    const shifts = [{ _id: "", name: "All Shifts" }, ...data];

    const { data: trips } = await getTrips();
    this.setState({ trips, shifts });
  }

  handleDelete = async trip => {
    const originalTrips = this.state.trips;
    const trips = originalTrips.filter(t => t._id !== trip._id);
    this.setState({ trips });

    try {
      await deleteTrip(trip._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This trip has already been deleted.");

      this.setState({ trips: originalTrips });
    }
  };

  handleLike = trip => {
    const trips = [...this.state.trips];
    const index = trips.indexOf(trip);
    trips[index] = { ...trips[index] };
    trips[index].liked = !trips[index].liked;
    this.setState({ trips });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleShiftSelect = shift => {
    this.setState({ selectedShift: shift, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedShift: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedShift,
      searchQuery,
      trips: allTrips
    } = this.state;

    let filtered = allTrips;
    if (searchQuery)
      filtered = allTrips.filter(t =>
        t.block.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedShift && selectedShift._id)
      filtered = allTrips.filter(t => t.shift._id === selectedShift._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const trips = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: trips };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    const { totalCount, data: trips } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.shifts}
            selectedItem={this.state.selectedShift}
            onItemSelect={this.handleShiftSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/trips/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Trip
            </Link>
          )}
          <p>Showing {totalCount} trips in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <TripsTable
            trips={trips}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}


export default Trips;
