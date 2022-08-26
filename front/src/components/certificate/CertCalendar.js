import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(day) => setSelectedDate(day)}
    />
  );
}

export default Calendar;
