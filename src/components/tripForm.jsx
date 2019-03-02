import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getTrip, saveTrip } from "../services/tripService";
import { getShifts } from "../services/shiftService";

function convertTo12Hour(oldFormatTime) {
  console.log("oldFormatTime: " + oldFormatTime);
  let oldFormatTimeArray = oldFormatTime.split(":");

  let HH = parseInt(oldFormatTimeArray[0]);
  let min = oldFormatTimeArray[1];

  let AMPM = HH >= 12 ? "PM" : "AM";
  let hours;
  if(HH === 0){
    hours = HH + 12;
  } else if (HH > 12) {
    hours = HH - 12;
  } else {
    hours = HH;
  }
  var newFormatTime = hours + ":" + min + AMPM;
  // console.log('new format time: ', newFormatTime);
  return newFormatTime;
}

function convertBack(timeBlock) { // 12:20 PM
  
  console.log('Time block: ', timeBlock);
  const AMorPM = timeBlock.substring(timeBlock.length - 2, timeBlock.length);
  console.log('AMORPM: ', AMorPM);
  const [hours, mins] = timeBlock.substring(0, timeBlock.length - 2).split(':')
  console.log('hours, mins: ', hours, mins);
  
  const time = timeBlock.slice(0, timeBlock.length - 2);
  console.log("time,", time);
  return AMorPM === 'AM' ? `0${time}` : `${(parseInt(time, 10) + 12)}:${mins}`;
  
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
    const [to, from] = trip.block.split(' - ');  
    console.log('formatted time', to, from) // [12:00AM,1:00PM]
    console.log('trip info: ', trip);
    let block1 = convertBack(to);
    let block2 = convertBack(from);
    console.log('Block1, block2: ', block1, block2);
    
    return {
      _id: trip._id,
      block1,   
      block2,
      date: trip.date,
      shiftId: trip.shift._id,
      numberOfPackages: trip.numberOfPackages,
      numberOfStops: trip.numberOfStops,
      initialPay: trip.initialPay,
      finalPay: trip.finalPay,
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
    // console.log("Formatted: ", formattedTime);
    const tripInfo = { ...rest, block: formattedTime, userId: this.props.user._id  };
    try {
      await saveTrip(tripInfo);
      this.props.history.push("/trips");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log('state: ', this.state.data);
    console.log('does user in my trip form exist??', this.props.user);
    return (
      <div>
        <h1 className="tripHeader">Trip Form</h1>
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
