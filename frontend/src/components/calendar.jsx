import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

function MyCalendar() {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <Calendar showDoubleView
                onChange={setDate}
                value={date}
            />
        </div>
    );
}

export default MyCalendar;