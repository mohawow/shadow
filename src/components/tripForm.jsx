import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getTrip, saveTrip } from "../services/tripService";
import { getShifts } from "../services/shiftService";

class TripForm extends Form {
  state = {
    data: {
      block: "",
      date: "",
      shiftId: "",
      numberOfPackages: "",
      numberOfStops: "",
      initialPay: "",
      finalPay: "",
      tips: "",
    },
    shifts: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    block: Joi.string()
      .required()
      .label("Block"),
    date: Joi.string()
      .required()
      .label("Date"),
    shiftId: Joi.string()
      .required()
      .label("Shift"),
    numberOfPackages: Joi.number()
      .required()
      .min(1)
      .max(100)
      .label("Packages"),
    numberOfStops: Joi.number()
      .required()
      .min(0)
      .max(1000)
      .label("Stops"),
    initialPay: Joi.number()
      .required()
      .min(1)
      .max(1000)
      .label("Initial Pay"),
    finalPay: Joi.number()
      .min(0)
      .max(1000)
      .label("Final Pay"),
    tips: Joi.number()
      .min(0)
      .max(1000)
      .label("Tips")
  };

  async populateShifts() {
    const { data: shifts } = await getShifts();
    this.setState({ shifts });
  }

  async populateTrip() {
    try {
      const tripId = this.props.match.params.id;
      if (tripId === "new") return;

      const { data: trip } = await getTrip(tripId);
      this.setState({ data: this.mapToViewModel(trip) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateShifts();
    await this.populateTrip();
  }

  mapToViewModel(trip) {
    return {
      _id: trip._id,
      block: trip.block,
      date:trip.date,
      shiftId: trip.shift._id,
      numberOfPackages: trip.numberOfPackages,
      numberOfStops: trip.numberOfStops,
      initialPay: trip.initialPay,
      finalPay: trip.finalPay,
      tips: trip.tips
    };
  }

  doSubmit = async () => {
    console.log(this.state.data);
    await saveTrip(this.state.data);
    

    this.props.history.push("/trips");
  };

  render() {
    return (
      <div>
        <h1>Trip Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("block", "Block", "string")}
          {this.renderInput("date", "Date")}
          {this.renderSelect("shiftId", "Shift", this.state.shifts)}
          {this.renderInput("numberOfPackages", "Number Of Packages", "number")}
          {this.renderInput("numberOfStops", "Number Of Stops", "number")}
          {this.renderInput("initialPay", "Initial Pay", "number")}
          {this.renderInput("finalPay", "Final Pay", "number")}
          {this.renderInput("tips", "Tips", "number")}
          {this.renderButton("Save")}
          
        </form>
      </div>
    );
  }
}

export default TripForm;
