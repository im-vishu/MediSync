import { useEffect, useState } from "react";
import { getDoctorSlots, bookAppointment } from "../api/apiClient";

export default function CalendarBooking({ doctorId }) {
  const [slots, setSlots] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getDoctorSlots(doctorId).then(setSlots);
  }, [doctorId]);

  return (
    <div>
      <h3>Available Slots</h3>
      <ul>
        {slots.filter(s=>!s.booked).map(slot => (
          <li key={slot.id}>
            <button className="btn" onClick={() => setSelected(slot)}>
              {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}
            </button>
          </li>
        ))}
      </ul>
      {selected && (
        <div>
          <p>Book slot at: {new Date(selected.startTime).toLocaleString()}?</p>
          <button className="btn btn-success"
                  onClick={() => bookAppointment(selected.id)}>
            Book
          </button>
        </div>
      )}
    </div>
  )
}