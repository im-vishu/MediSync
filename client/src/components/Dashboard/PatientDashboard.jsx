import { useEffect, useState } from "react";
import { getPatientAppointments } from "../../api/apiClient";

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getPatientAppointments().then(setAppointments);
  }, []);

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <h3>My Appointments</h3>
      <ul>
        {appointments.map(appt => (
          <li key={appt.id}>
            With Dr. {appt.doctor.user.name}, {new Date(appt.slot.startTime).toLocaleString()} - Status: {appt.status}
          </li>
        ))}
      </ul>
    </div>
  );
}