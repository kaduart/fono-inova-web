import React from 'react';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/Admins';
import AppointmentCalendar from './components/AppointmentCalendar';
import Doctor from './components/Doctors';
import Home from './components/Home';
import Login from './components/Login';
import Patient from './components/Patient';
import SignUp from './components/SignUp';
import PatientDetails from './components/patients/PatientDetails';

const App: React.FC = () => {
  Modal.setAppElement('#root');
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/calendar" element={<AppointmentCalendar />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;
