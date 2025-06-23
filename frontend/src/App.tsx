import React from 'react';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import AppointmentCalendar from './components/AppointmentCalendar';
import AppointmentScheduler from './components/AppointmentScheduler';
import { default as Doctor, default as DoctorDashboard } from './components/Doctors';
import Home from './components/Home';
import Login from './components/Login';
import AppChat from './components/mkt/whatsapp/AppChat';
import { default as Patient, default as PatientDashboard } from './components/patients/PatientDashboard';
import PatientEvolution from './components/patients/PatientEvolution';
import PatientSelection from './components/patients/PatientSelection';
import SignUp from './components/SignUp';
import { PrivateRoute } from './utils/PrivateRoute';
import PaymentPage from './components/financial/PaymentPage';


const App: React.FC = () => {

  Modal.setAppElement('#root');
  return (
    <Router>

      {/*  <Header /> */}

      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/doctor" element={<Doctor />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/doctors" element={<DoctorDashboard />} />
          {/*  
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/schedule" element={<ScheduleManager />} /> */}

          <Route path="/evolutions/:id" element={<PatientEvolution />} />
          <Route path="/calendar" element={<AppointmentCalendar />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/patient-dashboard/:id" element={<PatientDashboard />} />
          <Route path="/appointment" element={<AppointmentScheduler />} />
          <Route path="/select-patient" element={<PatientSelection />} />
          <Route path="/financeiro" element={<PaymentPage />} />
          <Route path="/whatsapp" element={<AppChat />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;
