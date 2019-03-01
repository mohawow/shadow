import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getTrip, saveTrip } from "../services/tripService";
import { getShifts } from "../services/shiftService";

function convertTo12Hour(oldFormatTime) {
  console.log("oldFormatTime: " + oldFormatTime);
  var oldFormatTimeArray = oldFormatTime.split(":");

  var HH = parseInt(oldFormatTimeArray[0]);
  var min = oldFormatTimeArray[1];

  var AMPM = HH >= 12 ? "PM" : "AM";
  var hours;
  if(HH == 0){
    hours = HH + 12;
  } else if (HH > 12) {
    hours = HH - 12;
  } else {
    hours = HH;
  }
  var newFormatTime = hours + ":" + min + AMPM;
  console.log('new format time: ', newFormatTime);
  return newFormatTime;
}

function convertBack(time) {

  const AMorPM = time.slice(-2);
  const time = time.slice(0, time.length - 2);
  return AMORPM === 'AM' ? time : +(parseInt(time, 10) + 12);

}




class TripForm extends Form {
  state = {
    data: {
      block1: "",
      block2: "",
      date: "",
      shiftId: "",
      numberOfPackages: "",
      numberOfStops: "",
      initialPay: "",
      finalPay: ""
    },
    shifts: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    block1: Joi.string()
      .required()
      .label("Block"),
    block2: Joi.string()
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
      .optional()
      .allow("")
      .min(0)
      .max(1000)
      .label("Final Pay")
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
    const convertFormattedToOriginal = trip.block.split(' - ');   // [12:00AM,1:00PM]
    
    let block1 = convertBack(convertFormattedToOriginal[0])
    let block2 = convertBack(convertFormattedToOriginal[1]);
    console.log('Block1, block2: ', block1, block2);

    return {
      _id: trip._id,
      // 12:00AM - 1:00PM
      block1,   
      block2,
      date: trip.date,
      shiftId: trip.shift._id,
      numberOfPackages: trip.numberOfPackages,
      numberOfStops: trip.numberOfStops,
      initialPay: trip.initialPay,
      finalPay: trip.finalPay,
      tips: trip.tips
    };
  }

  doSubmit = async () => {
    const { block1, block2, ...rest } = this.state.data;
    console.log(
      "Converting...: ",
      convertTo12Hour(block1),
      convertTo12Hour(block2)
    );
    const formattedTime = `${convertTo12Hour(block1)} - ${convertTo12Hour(
      block2
    )}`;
    console.log("Formatted: ", formattedTime);
    const tripInfo = { ...rest, block: formattedTime };
    try {
      await saveTrip(tripInfo);
      this.props.history.push("/trips");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Trip Form</h1>
        <form onSubmit={this.handleSubmit} className="tripForm">
          {this.renderInput("block1", "From", "time", "block1")}
          {this.renderInput("block2", "To", "time", "block2")}
          {this.renderInput("date", "Date", "date")}
          {this.renderSelect("shiftId", "Shift", this.state.shifts)}
          {this.renderInput("numberOfPackages", "Number Of Packages", "number")}
          {this.renderInput("numberOfStops", "Number Of Stops", "number")}
          {this.renderInput("initialPay", "Initial Pay", "number")}
          {this.renderInput("finalPay", "Final Pay", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default TripForm;
