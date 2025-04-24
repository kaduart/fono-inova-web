import { Activity, Calendar, ChevronDown, Clock, Eye, EyeOff, FileText, Home, Hospital, Pencil, Plus, ShieldCheck, Stethoscope, Trash2, UserCircle, UserPlus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';
import PatientForm from '../shared/components/PatientForm';
import PatientTable from './patients/PatientTable';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import Input from './ui/Input';
import { Label } from './ui/Label';
import { Select } from './ui/Select';

const defaultAppointmentData = {
  patientId: '',
  doctorId: '',
  date: '',
  time: '',
  type: 'fonoaudiologia',
  reason: '',
  status: 'agendado'
};

interface PatientData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  profession: string;
  placeOfBirth: string;
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  email: string;
  cpf: string;
  rg: string;
  specialties: string[];
  mainComplaint: string;
  clinicalHistory: string;
  medications: string;
  allergies: string;
  familyHistory: string;
  healthPlan: {
    name: string;
    policyNumber: string;
  };
  legalGuardian: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  appointments: {
    professional: string;
    date: string;
    time: string;
    sessionType: string;
    status: string;
    reason: string;
  }[];
  imageAuthorization: boolean;
}


const especialidadesDisponiveis = [
  { id: 'fonoaudiologia', label: 'Fonoaudiologia' },
  { id: 'psicologia', label: 'Psicologia' },
  { id: 'terapia_ocupacional', label: 'Terapia Ocupacional' },
  { id: 'fisioterapia', label: 'Fisioterapia' },
];

export default function AdminDashboard() {
  const { register, setValue, handleSubmit, reset, watch } = useForm();

  const initialPatientState: PatientData = {
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

  const [showDoctors, setShowDoctors] = useState(false);
  const [showPatients, setShowPatients] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [editedInfo, setEditedInfo] = useState(null);
  const [doctorData, setDoctorData] = useState({
    fullName: '',
    email: '',
    specialty: '',
    licenseNumber: '',
    phoneNumber: '',
    password: ''
  });

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [indexSelecionado, setIndexSelecionado] = useState<number | null>(null);


  const [patientData, setPatientData] = useState<PatientData>(initialPatientState);

  const [showDoctorPassword, setShowDoctorPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [doctorOverview, setDoctorOverview] = useState([]);
  const [patientOverview, setPatientOverview] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [hospitalCapacity] = useState(150);
  const [appointments, setAppointments] = useState([]);
  /*
   const [showAppointments, setShowAppointments] = useState(false);
   const [showPassword, setShowPassword] = useState(false); 
   const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  */
  const [appointmentData, setAppointmentData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: '',
    reason: '',
    status: ''
  });
  const [isEditingAppointment, setIsEditingAppointment] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);
  const [agendamentoTemp, setAgendamentoTemp] = useState({
    profissional: '',
    data: '',
    hora: '',
    tipoSessao: '',
    status: '',
    motivo: ''
  });

  const [agendamentosTemp, setAgendamentosTemp] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:5000/api/patients', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Pacientes recebidos:', data);
        setPatients(data);
      })
      .catch((err) => console.error('Erro ao buscar pacientes:', err));
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(BASE_URL + '/doctor/all', {
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

  const editarAgendamento = (index: number) => {
    const agendamento = agendamentosTemp[index];
    setAgendamentoTemp({
      profissional: agendamento.profissional,
      data: agendamento.dataHora.split(" ")[0],
      hora: agendamento.dataHora.split(" ")[1],
      tipoSessao: agendamento.tipoSessao,
      status: agendamento.status,
      motivo: agendamento.anotacoes,
    });
    setIndexSelecionado(index);
    setModalEditarAberto(true);
  };

  const confirmarRemocaoAgendamento = (index: number) => {
    setIndexSelecionado(index);
    setModalExcluirAberto(true);
  };

  const removerAgendamento = () => {
    if (indexSelecionado !== null) {
      setAgendamentosTemp(prev => prev.filter((_, idx) => idx !== indexSelecionado));
      setIndexSelecionado(null);
      setModalExcluirAberto(false);
    }
  };

  const salvarEdicaoAgendamento = () => {
    if (indexSelecionado !== null) {
      const atualizado = {
        profissional: agendamentoTemp.profissional,
        dataHora: `${agendamentoTemp.data} ${agendamentoTemp.hora}`,
        tipoSessao: agendamentoTemp.tipoSessao,
        status: agendamentoTemp.status,
        anotacoes: agendamentoTemp.motivo,
      };

      setAgendamentosTemp(prev => {
        const copia = [...prev];
        copia[indexSelecionado] = atualizado;
        return copia;
      });

      setModalEditarAberto(false);
      setIndexSelecionado(null);
      setAgendamentoTemp({
        profissional: '',
        data: '',
        hora: '',
        tipoSessao: '',
        status: 'agendado',
        motivo: '',
      });
    }
  };

  const handleSelectPatient = async (e) => {
    const selected = patients.find((p) => p._id === e.target.value);
    setSelectedPatient(selected);

    setValue('patientId', selected?._id); // Seta no form
    setValue('dateOfBirth', selected?.dateOfBirth?.split('T')[0]);

    if (selected?._id) {
      await fetchAppointments(selected._id); // Busca agendamentos do paciente
    }
  };

  const handleInputAgendamento = (e) => {
    const { name, value } = e.target;
    setAgendamentoTemp(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectDoctor = (event) => {
    setAgendamentoTemp((prev) => ({
      ...prev,
      profissional: event.target.value,  // Aqui você vai atualizar o estado com o ID do profissional
    }));
  };

  const adicionarAgendamento = (formData) => {
    const novoAgendamento = {
      profissional: formData.profissional,
      dataHora: `${formData.data} ${formData.hora}`,
      tipoSessao: formData.tipoSessao,
      status: formData.status,
      reason: formData.motivo,
    };

    setAgendamentosTemp(prev => [...prev, novoAgendamento]);
  };


  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminProfile();
    fetchTotalDoctors();
    fetchTotalPatients();
    fetchDoctorOverview();
    fetchDoctors();
    fetchPatientOverview();
    fetchCompletedAppointments();
    fetchUpcomingAppointments();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Handle not authenticated case
        return;
      }
      const response = await fetch(BASE_URL + '/admin/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAdminInfo(data);
        setEditedInfo(data);
      } else {
        // Handle error
        console.error('Failed to fetch admin profile');
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    }
  };

  /*   const handleSpecialtiesChange = (event) => {
      const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
      setPatientData(prevData => ({
        ...prevData,
        especialidades: selectedOptions,
      }));
    }; */

  const handleEspecialidadeToggle = (id) => {
    console.log('Toggling especialidade:', id);
    setPatientData((prev) => {

      console.log('Toggling PREV:', prev);
      const hasSelected = prev.specialties.includes(id);
      return {
        ...prev,
        specialties: hasSelected
          ? prev.specialties.filter((esp) => esp !== id)
          : [...prev.specialties, id],
      };
    });
  };

  const fetchTotalDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch(BASE_URL + '/admin/total-doctors', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTotalDoctors(data.totalDoctors);
      } else {
        console.error('Failed to fetch total doctors');
      }
    } catch (error) {
      console.error('Error fetching total doctors:', error);
    }
  };

  const fetchTotalPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch(BASE_URL + '/admin/total-patients', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTotalPatients(data.totalPatients);
      } else {
        console.error('Failed to fetch total patients');
      }
    } catch (error) {
      console.error('Error fetching total patients:', error);
    }
  };

  const fetchDoctorOverview = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch(BASE_URL + '/admin/doctor-overview', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDoctorOverview(data);
      } else {
        console.error('Failed to fetch doctor overview');
      }
    } catch (error) {
      console.error('Error fetching doctor overview:', error);
    }
  };

  const fetchPatientOverview = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch(BASE_URL + '/admin/patient-overview', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPatientOverview(data);
      } else {
        console.error('Failed to fetch patient overview');
      }
    } catch (error) {
      console.error('Error fetching patient overview:', error);
    }
  };

  const fetchCompletedAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(BASE_URL + '/admin/appointment/completed-cancelled', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched completed/cancelled appointments:', data); // For debugging
        setCompletedAppointments(data);
      } else {
        console.error('Failed to fetch completed/cancelled appointments');
      }
    } catch (error) {
      console.error('Error fetching completed/cancelled appointments:', error);
    }
  };

  const fetchUpcomingAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(BASE_URL + '/appointments/upcoming', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();

        // Sort appointments by date and time (soonest first)
        const sortedUpcoming = data.sort((a, b) =>
          new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time)
        );

        setUpcomingAppointments(sortedUpcoming); // Make sure you have this state defined
      } else {
        console.error('Failed to fetch upcoming appointments');
      }
    } catch (error) {
      console.error('Error fetching upcoming appointments:', error);
    }
  };

  const fetchAppointments = async (patientId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/appointments?patientId=${patientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);  // Atualiza o estado com os agendamentos
      } else {
        console.error('Erro ao buscar agendamentos:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  const renderDashboard = () => {
    const occupancyRate = ((totalPatients / hospitalCapacity) * 100).toFixed(2);
    return (
      <>

        <PatientTable></PatientTable>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader icon={Stethoscope}>
              <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDoctors}</div>
              <p className="text-xs text-gray-500">Active medical staff</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader icon={Users}>
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-gray-500">Currently admitted</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader icon={Activity}>
              <CardTitle className="text-sm font-medium">Hospital Occupancy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{occupancyRate}%</div>
              <p className="text-xs text-gray-500">Bed occupancy rate</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader icon={Stethoscope}>
              <CardTitle className="text-sm font-medium">Doctor Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doctorOverview.length}</div>
              <p className="text-xs text-gray-500">Total doctors on staff</p>
            </CardContent>
            <CardFooter className="p-2">
              <Button
                variant="ghost"
                className="w-full text-sm text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => setShowDoctors(!showDoctors)}
              >
                {showDoctors ? "Hide" : "View All"} Doctors
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showDoctors ? "rotate-180" : ""}`} />
              </Button>
            </CardFooter>
            {showDoctors && (
              <div className="px-4 pb-4">
                {doctorOverview?.map((doctor, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-t">
                    <div>
                      <p className="text-sm font-medium">{doctor.name}</p>
                      <p className="text-xs text-gray-500">{doctor.specialty}</p>
                    </div>
                    <p className="text-sm">{doctor.patients} patients</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card>
            <CardHeader icon={Users}>
              <CardTitle className="text-sm font-medium">Patient Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patientOverview.length}</div>
              <p className="text-xs text-gray-500">Total admitted patients</p>
            </CardContent>
            <CardFooter className="p-2">
              <Button
                variant="ghost"
                className="w-full text-sm text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => setShowPatients(!showPatients)}
              >
                {showPatients ? "Hide" : "View All"} Patients
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showPatients ? "rotate-180" : ""}`} />
              </Button>
            </CardFooter>
            {showPatients && (
              <div className="px-4 pb-4">
                {patientOverview?.map((patient, index) => (
                  <div key={index} className="py-2 border-t">
                    <p className="text-sm font-medium">{patient.name}</p>
                    <p className="text-xs text-gray-500">
                      Total Appointments: {patient.appointments}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {completedAppointments.slice(0, 3)?.map((appointment, index) => (
                  <li key={appointment._id || index} className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>
                      <strong>
                        {appointment.doctorId?.fullName}
                      </strong>
                      {appointment.status === "completed" ? " completed" : " cancelled"} appointment with{" "}
                      <strong>
                        {appointment.patientId?.fullName}
                      </strong>{" "}
                      on {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </span>
                  </li>
                ))}

                {/* Static fallback if no completed appointments */}
                {completedAppointments.length === 0 && (
                  <>
                    <li className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">No records found.</span>
                    </li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {upcomingAppointments.slice(0, 3)?.map((appointment, index) => (
                  <li key={appointment._id || index} className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>
                      <strong>
                        {appointment.doctorId?.fullName}
                      </strong>{"'s "}
                      appointment with{" "}
                      <strong>
                        {appointment.patientId?.fullName}
                      </strong>{" "}
                      on {new Date(appointment.date).toLocaleDateString()} at {appointment.time}. <span className="text-gray-500">{"(" + appointment.reason + ")"}</span>
                    </span>
                  </li>
                ))}

                {/* Fallback if there are no upcoming appointments */}
                {upcomingAppointments.length === 0 && (
                  <>
                    <li className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">No upcoming schedule.</span>
                    </li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const renderProfile = () => {
    if (!adminInfo) {
      return <div>Loading perfil...</div>;
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await fetch(BASE_URL + '/admin/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            fullName: editedInfo.fullName,
            email: editedInfo.email
          })
        });
        if (response.ok) {
          const updatedAdmin = await response.json();
          setAdminInfo(updatedAdmin.admin);
          setIsEditing(false);
          return toast.success("Perfil atualizado com sucesso.");
        } else {
          const errorData = await response.json();
          return toast.error("An error occurred");
        }
      } catch (error) {
        return toast.error('An error occurred. Please try again.');
      }
    };

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Admin Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={isEditing ? editedInfo.fullName : adminInfo.fullName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={isEditing ? editedInfo.email : adminInfo.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="mr-2">Save</Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="ml-auto">Edit Perfil</Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  const renderAddDoctor = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setDoctorData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You are not authenticated. Please log in.');
          return;
        }
        const response = await fetch(BASE_URL + '/admin/add-doctor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(doctorData)
        });
        if (response.ok) {
          setDoctorData({
            fullName: '',
            email: '',
            specialty: '',
            licenseNumber: '',
            phoneNumber: '',
            password: ''
          });
          fetchDoctorOverview();
          fetchTotalDoctors();
          return toast.success('Profissional adicionado com successo');
        } else if (response.status === 401) {
          navigate("/login");
          return toast.error('Sua sessao esta expirada. Por favor logue novamente.');
        } else {
          const errorData = await response.json();
          return toast.error('Ocorreu um erro. Por favor logue novamente.');
        }
      } catch (error) {
        return toast.error('Ocorreu um erro. Por favor logue novamente.');
      }
    };

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Cadastrar Profissional</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input id="fullName" name="fullName" value={doctorData.fullName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={doctorData.email} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidade</Label>
                <Select id="specialty" name="specialty" value={doctorData.specialty} onChange={handleInputChange} required>
                  <option value="">Escolha a especialidade</option>
                  <option value="fonoaudiologo">Fonoaudiólogo</option>
                  <option value="terapeuta-ocupacional">Terapeuta Ocupacional</option>
                  <option value="psicologo">Psicólogo</option>
                  <option value="fisioterapeuta">Fisioterapeuta</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Número Registro</Label>
                <Input id="licenseNumber" name="licenseNumber" value={doctorData.licenseNumber} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Telefone</Label>
                <Input id="phoneNumber" name="phoneNumber" type="tel" value={doctorData.phoneNumber} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showDoctorPassword ? "text" : "password"}
                    value={doctorData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowDoctorPassword(!showDoctorPassword)}
                  >
                    {showDoctorPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="sr-only">
                      {showDoctorPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <br /><br />
            <Button type="submit" className="ml-auto">Add Profissional</Button>
          </form>
        </CardContent>
      </Card>
    );
  };

  const renderAddPatient = () => {
    return (
      <PatientForm
        onSuccess={() => {
          fetchPatientOverview();
          fetchTotalPatients();
        }}
      />
    );
  };

  const renderAddAdmin = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAdminData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (adminData.password !== adminData.confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return toast.error('You are not authenticated. Please log in.');
        }
        const response = await fetch(BASE_URL + '/admin/add-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(adminData)
        });
        if (response.ok) {
          setAdminData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
          return toast.success('Admin added successfully');
        } else if (response.status === 401) {
          navigate("/login");
          return toast.error('Your session has expired. Please log in again.');
        } else {
          const errorData = await response.json();
          return toast.error("An error occurred.");
        }
      } catch (error) {
        return toast.error('An error occurred. Please try again.');
      }
    };

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input id="fullName" name="fullName" value={adminData.fullName} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={adminData.email} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showAdminPassword ? "text" : "password"}
                  value={adminData.password}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                >
                  {showAdminPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {showAdminPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showAdminPassword ? "text" : "password"}
                  value={adminData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="ml-auto">Add Admin</Button>
          </form>
        </CardContent>
      </Card>
    );
  };

  const renderAppointments = () => {
    console.log('DOCTORS LIST:', doctors);

    const onSubmitAppointment = async (formData) => {
      console.log('formData:', formData);
      if (!formData.profissional || formData.profissional.trim() === "") {
        toast.error("Selecione um profissional.");
        return;
      }

      const token = localStorage.getItem('token');
      const url = isEditingAppointment
        ? `${BASE_URL}/appointments/${appointmentData._id}`
        : `${BASE_URL}/appointments`;

      const payload = {
        patientId: formData.patientId,
        doctorId: formData.profissional,
        date: formData.data,        // pega o campo "data"
        time: formData.hora,        // pega o campo "hora"
        reason: formData.motivo,    // pega o campo "motivo"
        status: formData.status,
      };
      console.log('Payload enviado:', payload);

      try {
        const response = await fetch(url, {
          method: isEditingAppointment ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success('Agendamento salvo com sucesso!');
          fetchAppointments();
          setAgendamentoTemp({});
        } else {
          const errorData = await response.json();
          toast.error(errorData.error || 'Erro ao salvar agendamento');
        }
      } catch (error) {
        console.error(error);
        toast.error('Erro ao salvar agendamento');
      }
    };


    const handleDeleteAppointment = async (id) => {
      if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${BASE_URL}/appointments/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            toast.success('Agendamento excluído com sucesso!');
            fetchAppointments();
          }
        } catch (error) {
          toast.error('Erro ao excluir agendamento');
        }
      }
    };

    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Gestão de Agendamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitAppointment)} className="space-y-4">
            <fieldset className="border p-4 rounded-md">
              <legend className="px-2 font-medium text-gray-700">Dados Pessoais</legend>
              <div className="grid grid-cols-12 gap-4">
                <div className='col-span-12 md:col-span-6'>
                  <label className="block mb-1">Selecione o paciente</label>
                  <select
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 h-6"
                    {...register('patientId')}
                    onChange={handleSelectPatient}
                  >
                    <option value="">Selecione</option>
                    {patients.map((patient) => (
                      <option key={patient._id} value={patient._id}>
                        {patient.fullName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <label className="block mb-1">Data de nascimento</label>
                  <Input
                    type="date"
                    {...register('dateOfBirth')}
                    value={selectedPatient?.dateOfBirth ? selectedPatient.dateOfBirth.split('T')[0] : ''}
                    readOnly
                  />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <label className="block mb-1">Contato</label>
                  <Input
                    type="text"
                    {...register('phone')}
                    value={selectedPatient?.phone || ''}
                    readOnly
                  />
                </div>
              </div>
            </fieldset>

            {selectedPatient && (
              <fieldset className="border p-4 rounded-md">
                <legend className="px-2 font-medium text-gray-700">Agendamento(s) Previsionado(s)</legend>
                <div className="flex justify-end mt-4 mb-2">
                  <Button type="button" onClick={() => setModalAberto(true)} variant="outline" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {agendamentosTemp.length > 0 ? (
                  <div className="mt-6">
                    <div className="overflow-x-auto rounded-lg shadow-md">
                      <table className="min-w-full table-auto border-collapse bg-white">
                        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                          <tr>
                            <th className="p-3">Profissional</th>
                            <th className="p-3">Data/Hora</th>
                            <th className="p-3">Tipo</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Anotações</th>
                            <th className="p-3 text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {agendamentosTemp.map((ag, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                              <td className="p-3">{ag.profissional}</td>
                              <td className="p-3">{ag.dataHora}</td>
                              <td className="p-3">{ag.tipoSessao}</td>
                              <td className="p-3">{ag.status}</td>
                              <td className="p-3">{ag.anotacoes || '—'}</td>
                              <td className="p-3 text-center flex justify-center gap-3">
                                <button
                                  onClick={() => editarAgendamento(index)}
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Editar"
                                >
                                  <Pencil size={18} />
                                </button>
                                <button
                                  onClick={() => removerAgendamento(index)}
                                  className="text-red-600 hover:text-red-800"
                                  title="Excluir"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 mt-4">Nenhum agendamento adicionado.</p>
                )}

                <br />
                <br />
                <Button type="submit">
                  {isEditingAppointment ? 'Atualizar' : 'Confirmar agendamentos'}
                </Button>
              </fieldset>
            )}
          </form>
          <br />
          {selectedPatient && (
            <fieldset className="border p-4 rounded-md">
              <legend className="px-2 font-medium text-gray-700">Agendamento(s) Confirmados(s)</legend>
              <div className="mt-1">

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Data/Hora</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Profissional</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appointments?.map(appointment => (
                        <tr key={appointment._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(appointment.date).toLocaleDateString()} - {appointment.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {appointment.patientId?.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {appointment.doctorId?.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {appointment.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appointment.status === 'agendado' ? 'bg-blue-100 text-blue-800' :
                              appointment.status === 'concluído' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => editarAgendamento(index)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Editar"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => confirmarRemocaoAgendamento(index)}
                              className="text-red-600 hover:text-red-800"
                              title="Excluir"
                            >
                              <Trash2 size={18} />
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </fieldset>
          )}
        </CardContent>
        <Modal isOpen={modalAberto} onRequestClose={() => setModalAberto(false)} className="p-6 bg-white rounded-md max-w-md mx-auto mt-20 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Novo Agendamento</h3>
          <div className="space-y-3">
            <Select
              {...register('profissional', { required: true })}
              onChange={(e) => setValue('profissional', e.target.value)}  // Atualiza o valor via react-hook-form
            >
              <option value="">Selecione o profissional</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.fullName} - {doctor.specialty}
                </option>
              ))}
            </Select>

            <Input type="date" {...register('data', { required: true })} />
            <Input type="time" {...register('hora', { required: true })} />
            <Select {...register('tipoSessao', { required: true })}>
              <option value="">Tipo de Sessão</option>
              <option value="fonoaudiologia">Fonoaudiologia</option>
              <option value="psicologia">Psicologia</option>
              <option value="terapia_ocupacional">Terapia Ocupacional</option>
              <option value="fisioterapia">Fisioterapia</option>
            </Select>
            <Select  {...register('status', { required: true })}>
              <option value="agendado">Agendado</option>
              <option value="concluído">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </Select>
            <textarea placeholder="Motivo/Anotações" {...register('motivo')} className="w-full p-2 border rounded" rows={3} />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalAberto(false)}>Cancelar</Button>
            <Button
              onClick={handleSubmit((data) => {
                adicionarAgendamento(data);
                //reset({ paciente: watch('paciente'), });
                setModalAberto(false);
              })}
            >
              Salvar
            </Button>

          </div>
        </Modal>
        <Modal isOpen={modalEditarAberto} onRequestClose={() => setModalEditarAberto(false)} className="p-6 bg-white rounded-md max-w-md mx-auto mt-20 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Editar Agendamento</h3>
          <div className="space-y-3">
            <Select
              {...register('profissional', { required: true })}
              onChange={(e) => setValue('profissional', e.target.value)}  // Atualiza o valor via react-hook-form
            >
              <option value="">Selecione o profissional</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.fullName} - {doctor.specialty}
                </option>
              ))}
            </Select>
            <Input type="date" name="data" value={agendamentoTemp.data} onChange={handleInputAgendamento} />
            <Input type="time" name="hora" value={agendamentoTemp.hora} onChange={handleInputAgendamento} />
            <Select name="tipoSessao" value={agendamentoTemp.tipoSessao} onChange={handleInputAgendamento}>
              <option value="">Tipo de Sessão</option>
              <option value="fonoaudiologia">Fonoaudiologia</option>
              <option value="psicologia">Psicologia</option>
              <option value="terapia_ocupacional">Terapia Ocupacional</option>
              <option value="fisioterapia">Fisioterapia</option>
            </Select>
            <Select name="status" value={agendamentoTemp.status} onChange={handleInputAgendamento}>
              <option value="agendado">Agendado</option>
              <option value="concluído">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </Select>
            <textarea name="motivo" placeholder="Motivo/Anotações" value={agendamentoTemp.motivo} onChange={handleInputAgendamento} className="w-full p-2 border rounded" rows={3} />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalEditarAberto(false)}>Cancelar</Button>
            <Button onClick={salvarEdicaoAgendamento}>Salvar</Button>
          </div>
        </Modal>
        <Modal isOpen={modalExcluirAberto} onRequestClose={() => setModalExcluirAberto(false)} className="p-6 bg-white rounded-md max-w-sm mx-auto mt-20 shadow-lg text-center">
          <h3 className="text-lg font-semibold mb-4">Confirmar exclusão</h3>
          <p className="text-sm text-gray-600">Deseja realmente excluir este agendamento?</p>
          <div className="mt-6 flex justify-center gap-4">
            <Button variant="outline" onClick={() => setModalExcluirAberto(false)}>Cancelar</Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={removerAgendamento}>Excluir</Button>
          </div>
        </Modal>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-blue-600">
      <header className="bg-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Hospital className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl">Clínica Fono Inova</span>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>Sair</Button>
      </header>
      <nav className="bg-blue-700 text-white p-4">
        <ul className="flex space-x-4 justify-center">
          <li>
            <Button
              variant={activeTab === 'Dashboard' ? "outline" : "ghost"}
              className={`hover:bg-white hover:text-blue-600 ${activeTab === 'Dashboard' ? 'bg-white text-blue-600' : 'text-blue-300'}`}
              onClick={() => setActiveTab('Dashboard')}
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === 'Profile' ? "outline" : "ghost"}
              className={`hover:bg-white hover:text-blue-600 ${activeTab === 'Profile' ? 'bg-white text-blue-600' : 'text-blue-300'}`}
              onClick={() => setActiveTab('Profile')}
            >
              <UserCircle className="w-4 h-4 mr-2" />
              Perfil
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === 'Add Profissional' ? "outline" : "ghost"}
              className={`hover:bg-white hover:text-blue-600 ${activeTab === 'Add Profissional' ? 'bg-white text-blue-600' : 'text-blue-300'}`}
              onClick={() => setActiveTab('Add Profissional')}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Profissional
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === 'Add Paciente' ? "outline" : "ghost"}
              className={`hover:bg-white hover:text-blue-600 ${activeTab === 'Add Paciente' ? 'bg-white text-blue-600' : 'text-blue-300'}`}
              onClick={() => setActiveTab('Add Paciente')}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Paciente
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === 'Appointments' ? "outline" : "ghost"}
              className={`hover:bg-white hover:text-blue-600 ${activeTab === 'Appointments' ? 'bg-white text-blue-600' : 'text-blue-300'}`}
              onClick={() => setActiveTab('Appointments')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agendamentos
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === 'Add Admin' ? "outline" : "ghost"}
              className={`hover:bg-white hover:text-blue-600 ${activeTab === 'Add Admin' ? 'bg-white text-blue-600' : 'text-blue-300'}`}
              onClick={() => setActiveTab('Add Admin')}
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Add Admin
            </Button>
          </li>
        </ul>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Bem vindo(a), {adminInfo ? `${adminInfo.fullName}` : 'Admin'}</h1>
        {activeTab === 'Dashboard' && renderDashboard()}
        {activeTab === 'Profile' && renderProfile()}
        {activeTab === 'Add Profissional' && renderAddDoctor()}
        {activeTab === 'Add Paciente' && renderAddPatient()}
        {activeTab === 'Add Admin' && renderAddAdmin()}
        {activeTab === 'Appointments' && renderAppointments()}
      </main>
    </div>
  );
}