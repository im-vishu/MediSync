const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const getToken = () => JSON.parse(localStorage.getItem("user") || "{}")?.token;

// Expand with real backend fetches!
// Admin
export const getAdminStats = async () =>
  fetch(`${API_URL}/admin/stats`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(r=>r.json());

export const getPendingDoctors = async () =>
  fetch(`${API_URL}/admin/doctors`, { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(r=>r.json()).then(({ doctors }) => doctors.filter(d => !d.approved));

// Doctor
export const approveDoctor = async (doctorId, approved) =>
  fetch(`${API_URL}/admin/doctors/${doctorId}/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ approved })
  }).then(r=>r.json());

export const getDoctorAppointments = async () =>
  fetch(`${API_URL}/appointments/my-patients`, { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(r=>r.json()).then(({ appointments }) => appointments);

// Patient
export const getPatientAppointments = async () =>
  fetch(`${API_URL}/appointments/mine`, { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(r=>r.json()).then(({ appointments }) => appointments);

    export const getDoctorSlots = async (doctorId) =>
  fetch(`${API_URL}/slots/doctor/${doctorId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(r=>r.json()).then(({ slots }) => slots);

export const bookAppointment = async (slotId) =>
  fetch(`${API_URL}/appointments/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ slotId })
  }).then(r=>r.json());