import React from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

function OpenandClosePicker({ value, setValue }) {
  return (
    <div>
      <DateTimePicker onChange={setValue} value={value} />
    </div>
  );
}

export default OpenandClosePicker;
