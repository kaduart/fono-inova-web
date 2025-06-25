import axios from 'axios';
import { Calendar, Calendar as CalendarIcon, ChevronDown, Clock, FileText, Home, Hospital, LineChart, UserCircle, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants/constants';
import { createEvaluation, deleteEvaluation, getEvaluationsByPatient, updateEvaluation } from '../../services/evaluationService';
import { IDoctors, IPatient, ScheduleAppointment } from '../../utils/types';
import AppointmentHistoryModal from '../AppointmentHistoryModal';
import StatusBadge from '../StatusBadge';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import Input from '../ui/Input';
import { Label } from '../ui/Label';
import { Select } from '../ui/Select';
import { PatientAvailablesCard } from './PatientAvailablesCard';
import PatientEvolution from './PatientEvolution';
import { PatientMiniCalendar } from './PatientMiniCalendar';
import TherapyPackagesSummary from './TherapyPackagesSummary';

const initialPatientState: IPatient = {
  fullName: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  profession: '',
  placeOfBirth: '',
  address: {
    street: '',
    number: '',
    district: '',
    city: '',
    state: '',
    zipCode: ''
  },
  phone: '',
  email: '',
  cpf: '',
  rg: '',
  specialties: [],
  mainComplaint: '',
  clinicalHistory: '',
  medications: '',
  allergies: '',
  familyHistory: '',
  healthPlan: {
    name: '',
    policyNumber: ''
  },
  legalGuardian: '',
  emergencyContact: {
    name: '',
    phone: '',
    relationship: ''
  },
  appointments: [],
  imageAuthorization: false
};

export default function PatientDashboard() {
  const { id: patientId } = useParams();
  const [showAppointments, setShowAppointments] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [patientInfo, setPatientInfo] = useState<IPatient>(initialPatientState);
  const [editedInfo, setEditedInfo] = useState(null);
  const [doctors, setDoctors] = useState<IDoctors[]>([]);
  const [appointmentData, setAppointmentData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [appointments, setAppointments] = useState<ScheduleAppointment[]>([]);
  const [careTeam, setCareTeam] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [evolutions, setEvolutions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  const [evaluationToEdit, setEvaluationToEdit] = useState(null);

  const navigate = useNavigate();

  const fetchPatientProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${BASE_URL}/patients/${patientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPatientInfo(data);
        setEditedInfo(data);
      } else {
        console.error('Falhou ao busca os dados do paciente');
      }
    } catch (error) {
      console.error('Erro ao busca os dados do paciente:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(BASE_URL + '/doctor', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        console.error('Failed to fetch doctors');
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const today = new Date().toISOString().split('T')[0]; // formato 'YYYY-MM-DD'

  const todaysAppointments = appointments.filter((appt) => {
    const apptDate = new Date(appt.date).toISOString().split('T')[0];
    return apptDate === today;
  });

  const fetchAvailableSlots = async (doctorId, date) => {
    if (!doctorId || !date) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(BASE_URL + `/patient/available-slots?doctorId=${doctorId}&date=${date}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const slots = await response.json();
        setAvailableSlots(slots);
      } else {
        console.error('Failed to fetch available slots');
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/appointments/patient/${patientId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };


  const handleOpenHistory = () => {
    setShowHistory(true);
  };

  const fetchCompletedAppointments = async () => {
    /* try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(BASE_URL + '/patient/appointment/completed-cancelled', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCompletedAppointments(data);
      } else {
        console.error('Failed to fetch completed/cancelled appointments');
      }
    } catch (error) {
      console.error('Error fetching completed/cancelled appointments:', error);
    } */
  };


  const fetchCareTeam = async () => {
    /* try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(BASE_URL + '/patient/care-team', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCareTeam(data);
      } else {
        console.error('Failed to fetch care team');
      }
    } catch (error) {
      console.error('Error fetching care team:', error);
    } */
  };

  const fetchPrescriptions = async () => {
    /* try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(BASE_URL + '/patient/prescriptions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      } else {
        console.error('Failed to fetch prescriptions');
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    } */
  };

  useEffect(() => {
    if (activeTab === 'Evolution' && patientInfo?._id) {
      const fetchEvolutions = async () => {
        try {
          const response = await axios.get(`/api/evolutions/patient/${patientInfo._id}`);
          setEvolutions(response.data);
        } catch (error) {
          console.error('Erro ao carregar evoluções:', error);
          toast.error('Erro ao carregar dados de evolução');
        }
      };

      fetchEvolutions();
    }
  }, [activeTab, patientInfo]);

  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {

    fetchEvaluations();
  }, [patientInfo]);

  const handleEvaluationSubmit = async (data: any, id?: string) => {
    try {
      if (id) {
        await updateEvaluation(id, data);
        toast.success("Avaliação atualizada com sucesso!");
      } else {
        await createEvaluation({ ...data, patientId: patientInfo._id });
        toast.success("Avaliação criada com sucesso!");
      }

      const updated = await getEvaluationsByPatient(patientInfo._id);
      setEvaluations(updated);
    } catch (error) {
      toast.error("Erro ao salvar avaliação.");
      console.error("Erro:", error);
    }
  };


  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta avaliação?")) {
      try {
        await deleteEvaluation(`${id}`);
        toast.success("Avaliação excluída com sucesso!");
        fetchEvaluations();
      } catch (err) {
        toast.error("Erro ao excluir avaliação.");
      }
    }
  };

  const fetchEvaluations = async () => {
    try {
      if (patientInfo?._id) {
        const data = await getEvaluationsByPatient(patientInfo._id);
        setEvaluations(data);
      }
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    }
  };

  useEffect(() => {
    fetchPatientProfile();
    fetchDoctors();
    fetchAppointments();
    fetchCareTeam();
    fetchPrescriptions();
    fetchCompletedAppointments();
  }, []);

  /* const submitEvaluation = async (data: EvaluationData, id?: string) => {
    try {
      if (id) {
        await axios.put(`/api/evolutions/${id}`, data);
        toast.success('Avaliação atualizada!');
      } else {
        await axios.post('/api/evaluations/availables', {
          ...data,
          patientId,
          type: 'avaliação',
        });
        toast.success('Avaliação criada!');
      }
      fetchEvaluations();
    } catch (err) {
      toast.error('Erro ao salvar avaliação.');
    }
  }; */


  /* const handleEvaluationSubmit = async (formData: any) => {
    const token = localStorage.getItem("token");

    if (!patientInfo?._id || !token) {
      toast.error("Paciente ou token não encontrado.");
      return;
    }

    const result = await createEvaluation(
      {
        patientId: patientInfo._id,
        doctorId: formData.doctorId,
        sessionType: formData.sessionType,
        paymentType: formData.paymentType,
        date: formData.date,
        time: formData.time,
      },
    );

    if (result.success) {
      toast.success("Avaliação criada com sucesso!");
    }
  }; */
  const renderDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-5 gap-6">
        <Card>
          <CardHeader icon={Calendar}>
            <CardTitle className="text-sm font-medium">Agendamentos para hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todaysAppointments.length}
            </div>
            {todaysAppointments.length > 0 ? (
              <p className="text-xs text-gray-500">
                Próxima: Dr. {appointments[0].doctorId?.fullName} às {appointments[0].time}
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                Sem agendamentos para hoje
              </p>
            )}
          </CardContent>
          <CardFooter className="p-2 flex justify-between items-center">
            <Button
              variant="ghost"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              onClick={() => setShowAppointments(!showAppointments)}
            >
              {showAppointments ? "Esconder" : "Ver"} Agendamentos para hoje
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAppointments ? "rotate-180" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              onClick={handleOpenHistory}
            >
              Ver histórico completo
            </Button>
          </CardFooter>

          {showAppointments && (
            <div className="px-4 pb-4">
              {appointments.length > 0 ? (
                todaysAppointments.map((appointment, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-t">
                    <div>
                      <p className="text-sm font-medium">
                        <StatusBadge status={appointment.status} />
                        Dr. {appointment.doctorId?.fullName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {appointment.reason}
                      </p>
                    </div>
                    <p className="text-sm">{appointment.time}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Não tem agendamentos para hoje
                </p>
              )}
            </div>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {completedAppointments.slice(0, 3).map((appointment, index) => (
                <li key={appointment._id || index} className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>
                    {appointment.status === "completed" ? "Completed" : "Cancelled"} appointment with{" "}
                    <strong>
                      {appointment.doctorId?.fullName}
                    </strong>{" "}
                    na {new Date(appointment.date).toLocaleDateString()} às {appointment.time}
                  </span>
                </li>
              ))}

              {/* Static fallback if no completed appointments */}
              {completedAppointments.length === 0 && (
                <>
                  <li className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Nenhum registro encontrado.</span>
                  </li>
                </>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 mb-5 gap-6">
        <PatientAvailablesCard
          doctors={doctors}
          evaluations={evaluations}
          patientInfo={patientInfo}
          evaluationToEdit={evaluationToEdit}
          setEvaluationToEdit={setEvaluationToEdit}
          onSubmit={handleEvaluationSubmit}
          onDelete={handleDelete}

        />
      </div>
      <PatientMiniCalendar appointments={appointments} />

      <Card>
        <CardHeader icon={FileText}>
          <CardTitle className="text-sm font-medium">Prescrições</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{prescriptions.length}</div>
          <p className="text-xs text-gray-500">Prescrições Ativa</p>
        </CardContent>
        <CardFooter className="p-2">
          <Button
            variant="ghost"
            className="w-full text-sm text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => setShowPrescriptions(!showPrescriptions)}
          >
            {showPrescriptions ? "Hide" : "Ver Todas"} Prescrições
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showPrescriptions ? "rotate-180" : ""}`} />
          </Button>
        </CardFooter>
        {showPrescriptions && (
          <div className="px-4 pb-4">
            {prescriptions.map((prescription, index) => (
              <div key={index} className="py-2 border-t">
                <p className="text-sm font-medium">{prescription.medication}</p>
                <p className="text-xs text-gray-500">
                  {prescription.dosage} - {prescription.frequency} - {" (Till - "}{new Date(prescription.tilldate).toLocaleDateString()}{") "}
                </p>
                <p className="text-xs text-gray-500">
                  Prescrito por: Dr. {prescription.doctorId?.fullName}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Equipe de cuidado</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {careTeam.map((member, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>Dr. {member.fullName} - {member.specialty}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <AppointmentHistoryModal
        open={showHistory}
        onClose={() => setShowHistory(false)}
        appointments={appointments}
      />
    </>
  );


  const renderEvolution = () => {
    if (!patientInfo) return null;

    return (
      <PatientEvolution
        patientId={patientInfo._id}
        patientName={patientInfo.fullName}
      />
    );
  };

  const renderManagePackages = () => {
    if (!patientInfo) return null;

    return (
      <TherapyPackagesSummary patient={patientInfo} doctors={doctors} />
    );
  };

  const renderAppointmentBooking = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAppointmentData(prev => ({ ...prev, [name]: value }));

      if (name === 'date' || name === 'doctorId') {
        fetchAvailableSlots(appointmentData.doctorId, value);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(BASE_URL + '/patient/book-appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(appointmentData)
        });
        if (response.ok) {
          const result = await response.json();
          setAppointmentData({
            doctorId: '',
            date: '',
            time: '',
            reason: ''
          });
          setAvailableSlots([]);
          fetchAppointments();
          return toast.success('Appointment booked successfully.');
        } else {
          const errorData = await response.json();
          return toast.error(`Failed to book appointment.`);
        }
      } catch (error) {
        return toast.error('Error booking appointment. Please try again.');
      }
    };

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Marque uma consulta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doctorId">Selecione o profissional</Label>
              <Select id="doctorId" name="doctorId" value={appointmentData.doctorId} onChange={handleInputChange}>
                <option value="">Escolha o profissional</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.fullName} - {doctor.specialty}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Data da consulta</Label>
              <Input id="date" name="date" type="date" value={appointmentData.date} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Hora pretendida</Label>
              <Select id="time" name="time" value={appointmentData.time} onChange={handleInputChange} disabled={availableSlots.length === 0}>
                <option value="">Escolha um horário</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Razão da visita</Label>
              <Input id="reason" name="reason" value={appointmentData.reason} onChange={handleInputChange} placeholder="Brief description of your concern" />
            </div>
            <Button type="submit" className="ml-auto">Marcar consulta</Button>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <NavLink
                to="/admin"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="bg-blue-100/80 p-2.5 rounded-xl shadow-sm">
                  <Hospital className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-500 transition-all duration-300">
                  Fono<span className="font-extrabold">Inova</span>
                </span>
              </NavLink>
            </div>

            <nav className="hidden md:flex items-center space-x-2">
              <Button
                variant={activeTab === 'Dashboard' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('Dashboard')}
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>

              <Button
                variant={activeTab === 'Profile' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('Profile')}
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                <UserCircle className="h-4 w-4 mr-2" />
                Perfil
              </Button>

              <Button
                variant={activeTab === 'Appointment Booking' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('Appointment Booking')}
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Agendamentos
              </Button>

              <Button
                variant={activeTab === 'Management Packages' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('Management Packages')}
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                Pacotes
              </Button>

              <Button
                variant={activeTab === 'Evolution' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('Evolution')}
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                <LineChart className="h-4 w-4 mr-2" />
                Evolução
              </Button>
            </nav>

            <button
              onClick={() => setActiveTab('Profile')}
              className="p-1 rounded-full text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">
                  {patientInfo?.fullName?.charAt(0) || 'P'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex items-center gap-3">
          <UserCircle className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-semibold text-gray-800">
            {patientInfo?.fullName || 'Paciente'}
          </h1>
        </div>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeTab === 'Dashboard'}
            {activeTab === 'Profile' && 'Meu Perfil'}
            {activeTab === 'Appointment Booking' && 'Agendamentos'}
            {activeTab === 'Management Packages' && 'Pacotes de Terapia'}
            {activeTab === 'Evolution' && 'Evolução do Tratamento'}
          </h2>

          {activeTab === 'Dashboard' && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                Atualizado em {new Date().toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'Dashboard' && renderDashboard()}
          {activeTab === 'Appointment Booking' && renderAppointmentBooking()}
          {activeTab === 'Management Packages' && renderManagePackages()}
          {activeTab === 'Evolution' && renderEvolution()}
        </div>
      </main>
    </div>
  );
}