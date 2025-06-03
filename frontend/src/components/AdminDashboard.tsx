
import { Activity, ChevronDown, Clock, Eye, EyeOff, FileText, Stethoscope, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';
import doctorService, { CreateDoctorParams } from '../services/doctorService';
import PatientForm from '../shared/components/PatientForm';
import EnhancedCalendar from './EnhancedCalendar';
import { PaymentPage } from './financial/PaymentPage';
import ManageDoctors from './ManageDoctors/ManageDoctors';
import { LeadsTable } from './mkt/LeadsTable';
import PatientTable from './patients/PatientTable';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import Input from './ui/Input';
import { Label } from './ui/Label';

const defaultAppointmentData = {
  patientId: '',
  doctorId: '',
  date: '',
  time: '',
  type: 'fonoaudiologia',
  reason: '',
  status: 'agendado'
};

export interface PatientData {
  _id?: string;
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
  const [openModal, setOpenModal] = useState(false);

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

  const [agendamentoTemp, setAgendamentoTemp] = useState({
    profissional: '',
    data: '',
    hora: '',
    sessionType: '',
    status: '',
    motivo: ''
  });

  const [agendamentosTemp, setAgendamentosTemp] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [adminData, setAdminData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openMenu, setOpenMenu] = useState('');

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? '' : menuName);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchPatients = async () => {
      try {
        const response = await fetch(`${BASE_URL}/patients`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          // Para cada paciente, busca o resumo de consultas
          const enrichedPatients = await Promise.all(
            data.map(async (patient) => {
              try {
                const summaryRes = await fetch(`${BASE_URL}/patients/${patient._id}/appointments-summary`, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                });

                const summary = await summaryRes.json();
                return {
                  ...patient,
                  lastAppointment: summary.lastAppointment || null,
                  nextAppointment: summary.nextAppointment || null,
                };
              } catch (err) {
                console.error(`Erro ao buscar resumo para o paciente ${patient._id}`, err);
                return {
                  ...patient,
                  lastAppointment: null,
                  nextAppointment: null,
                };
              }
            })
          );

          setPatients(enrichedPatients);

        } else {
          console.error('Resposta inesperada da API:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchPatients = async () => {
      try {
        const response = await fetch(`${BASE_URL}/patients`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setPatients(data);

        } else {
          console.error('Resposta inesperada da API:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchPatients();
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

  /*const editarAgendamento = (index: number) => {
    const agendamento = agendamentosTemp[index];
    setAgendamentoTemp({
      profissional: agendamento.profissional,
      data: agendamento.dataHora.split(" ")[0],
      hora: agendamento.dataHora.split(" ")[1],
      sessionType: agendamento.sessionType,
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
        sessionType: agendamentoTemp.sessionType,
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
        sessionType: '',
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
    }; */

  /* const handleInputAgendamento = (e) => {
    const { name, value } = e.target;
    setAgendamentoTemp(prev => ({ ...prev, [name]: value }));
  };
 */
  /*   const handleSelectDoctor = (event) => {
      setAgendamentoTemp((prev) => ({
        ...prev,
        profissional: event.target.value,  // Aqui você vai atualizar o estado com o ID do profissional
      }));
    }; */

  /* const adicionarAgendamento = (formData) => {
    const novoAgendamento = {
      profissional: formData.profissional,
      dataHora: `${formData.data} ${formData.hora}`,
      sessionType: formData.sessionType,
      status: formData.status,
      reason: formData.motivo,
    };

    setAgendamentosTemp(prev => [...prev, novoAgendamento]);
  }; */


  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminProfile();
    fetchTotalDoctors();
    fetchTotalPatients();
    fetchDoctorOverview();
    fetchDoctors();
    fetchPatientOverview();
    fetchCompletedAppointments();
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

  const handleEspecialidadeToggle = (id) => {
    setPatientData((prev) => {


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
        console.error('Falha ao buscar profissionais totais');
      }
    } catch (error) {
      console.error('Erro ao buscar o total de profissionais:', error);
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

        setCompletedAppointments(data);
      } else {
        console.error('Failed to fetch completed/cancelled appointments');
      }
    } catch (error) {
      console.error('Error fetching completed/cancelled appointments:', error);
    }
  };

  const handleSaveDoctor = async (doctor: CreateDoctorParams) => {
    try {
      if (doctor._id) {
        await doctorService.updateDoctor(doctor._id, doctor);
        toast.success("Profissional atualizado com sucesso!");
        setOpenModal(false);
      } else {
        await doctorService.createDoctor(doctor);
        toast.success("Profissional cadastrado com sucesso!");
        setOpenModal(false);
      }

      await fetchDoctors(); // Atualiza a lista
      await fetchTotalDoctors(); // Atualiza total
    } catch (error: any) {
      if (error.message?.includes("expirado")) {
        toast.error("Sessão expirada. Faça login novamente.");
        navigate("/login");
      } else {
        toast.error(error.message || "Erro ao salvar profissional.");
      }
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

        <PatientTable patients={patients}></PatientTable>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader icon={Stethoscope}>
              <CardTitle>Total Profissionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDoctors}</div>
              <p className="text-xs text-gray-500">Equipe médica ativa</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader icon={Users}>
              <CardTitle >Total Pacientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-gray-500">Atualmente admitido</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader icon={Activity}>
              <CardTitle >Ocupação Hospitalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{occupancyRate}%</div>
              <p className="text-xs text-gray-500">Taxa de ocupação de salas</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader icon={Stethoscope}>
              <CardTitle >Visão geral do médico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doctorOverview.length}</div>
              <p className="text-xs text-gray-500">Total de médicos na equipe</p>
            </CardContent>
            <CardFooter className="p-2">
              <Button
                variant="ghost"
                className="w-full text-sm text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => setShowDoctors(!showDoctors)}
              >
                {showDoctors ? "Esconder" : "Ver Todos"} Profissionais
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
                    <p className="text-sm">{doctor.patients} pacientes</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card>
            <CardHeader icon={Users}>
              <CardTitle >Visão geral de pacientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patientOverview.length}</div>
              <p className="text-xs text-gray-500">Total de pacientes</p>
            </CardContent>
            <CardFooter className="p-2">
              <Button
                variant="ghost"
                className="w-full text-sm text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => setShowPatients(!showPatients)}
              >
                {showPatients ? "Esconder" : "Ver Todos"} Pacientes
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showPatients ? "rotate-180" : ""}`} />
              </Button>
            </CardFooter>
            {showPatients && (
              <div className="px-4 pb-4">
                {patientOverview?.map((patient, index) => (
                  <div key={index} className="py-2 border-t">
                    <p className="text-sm font-medium">{patient.fullName}</p>
                    <p className="text-xs text-gray-500">
                      Total Compromissos: {patient.appointments}
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
              <CardTitle>Atividade recente</CardTitle>
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
                      <span className="text-gray-400">Nenhum registro encontrado.</span>
                    </li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Próxima programação</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {upcomingAppointments.slice(0, 3)?.map((appointment, index) => (
                  <li key={appointment._id || index} className="flex items-center space-x-2">
                    <EnhancedCalendar className="h-4 w-4 text-blue-600" />
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
                      <span className="text-gray-400">Sem programação futura.</span>
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
      return <div>Carregando perfil...</div>;
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

  // Função para abrir o modal em modo edição ou criação



  const renderAddDoctor = () => {
    return (
      <ManageDoctors
        onSubmitDoctor={handleSaveDoctor}
        doctors={doctors}
        patients={patients}
        openModal={openModal}
      />
    );
  }
  /*const renderAddDoctor = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setDoctorData(prev => ({ ...prev, [name]: value }));
    };
  
    const renderAddDoctor = () => {
      const [formLoading, setFormLoading] = useState(false);
      const [showDoctorPassword, setShowDoctorPassword] = useState(false);
  
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoctorData((prev) => ({ ...prev, [name]: value }));
      };
  
      const handleSubmit = async (e) => {
        e.preventDefault();
  
        // Validação simples
        if (!doctorData.fullName.trim()) return toast.error('Nome é obrigatório');
        if (!doctorData.email.trim()) return toast.error('Email é obrigatório');
        if (!doctorData.password.trim() && !isEditing) return toast.error('Senha é obrigatória para novo cadastro');
  
        setFormLoading(true);
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            toast.error('Sessão expirada, faça login novamente.');
            navigate('/login');
            return;
          }
  
          let url = BASE_URL + '/admin/add-doctor';
          let method = 'POST';
  
          if (isEditing) {
            url = BASE_URL + `/admin/update-doctor/${doctorData.id}`; // ajuste conforme sua API
            method = 'PUT';
          }
  
          const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(doctorData),
          });
  
          if (response.ok) {
            toast.success(isEditing ? 'Profissional atualizado com sucesso!' : 'Profissional adicionado com sucesso!');
            setShowAddDoctorModal(false);
            fetchDoctorOverview();
            fetchTotalDoctors();
          } else if (response.status === 401) {
            navigate('/login');
            toast.error('Sua sessão expirou. Por favor, faça login novamente.');
          } else {
            const errorData = await response.json();
            toast.error(errorData.message || 'Erro ao salvar profissional.');
          }
        } catch (error) {
          toast.error('Erro ao salvar profissional. Tente novamente.');
        } finally {
          setFormLoading(false);
        }
      };
  
      return (
        <Modal open={showAddDoctorModal} onClose={() => setShowAddDoctorModal(false)}>
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>{isEditing ? 'Editar Profissional' : 'Cadastrar Profissional'}</CardTitle>
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
                  <div className="space-y-2 relative">
                    <Label htmlFor="password">Senha {isEditing ? '(deixe em branco para manter)' : ''}</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showDoctorPassword ? 'text' : 'password'}
                        value={doctorData.password}
                        onChange={handleInputChange}
                        required={!isEditing} // obrigatório só para novo cadastro
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowDoctorPassword(!showDoctorPassword)}
                      >
                        {showDoctorPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                        <span className="sr-only">{showDoctorPassword ? 'Ocultar senha' : 'Mostrar senha'}</span>
                      </Button>
                    </div>
                  </div>
                </div>
  
                <div className="flex justify-end">
                  <Button type="submit" disabled={formLoading}>
                    {formLoading ? (isEditing ? 'Salvando...' : 'Adicionando...') : (isEditing ? 'Salvar Alterações' : 'Adicionar Profissional')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Modal>
      );
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
      <div className="flex items-center space-x-2">
        <Button onClick={() => openAddDoctorModal()} className="ml-auto">Adicionar Profissional</Button>
      </div>
    );
   
  
  return (
    <>
    <div className="flex items-center space-x-2">
      <Link to={`/patient-dashboard/`} title="Ver Detalhes">
          <Eye className="text-blue-600 hover:text-blue-800 cursor-pointer text-xl mx-2" />
      </Link>
      <Link to={`/evolutions/`} title="Ver Evoluções">
          <FileHeart className="text-green-600 hover:text-green-800 cursor-pointer text-xl mx-2" />
      </Link>
    </div>
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
    </>
  ); 
  };*/

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


  const renderCalendarGeneral = () => {
    return (
      <EnhancedCalendar />
    );
  };


  const renderLeads = () => (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Leads e Marketing</h2>
      <LeadsTable />
    </div>
  );

  const renderFinanceiro = () => (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Controle Financeiro</h2>
      <PaymentPage />
    </div>
  );

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

  return (
    <div className="min-h-screen bg-blue-600 text-white">

      {/* Menu de navegação */}
      <nav className="bg-blue-700 px-6 py-3 shadow flex justify-between items-center relative">
        <div className="flex gap-6 items-center relative">

          <button onClick={() => setActiveTab('Dashboard')} className="hover:bg-white/20 px-3 py-2 rounded">
            🏠 Dashboard
          </button>

          {/* Menus agrupados */}
          {[
            {
              label: '👤 Gestão',
              id: 'gestao',
              items: [
                { label: 'Profissionais', tab: 'Add Profissional' },
                { label: 'Pacientes', tab: 'Add Paciente' },
                { label: 'Admins', tab: 'Add Admin' },
              ],
            },
            {
              label: '📅 Agenda',
              id: 'agenda',
              items: [{ label: 'Calendário', tab: 'Calendário' }],
            },
            {
              label: '💵 Financeiro',
              id: 'financeiro',
              items: [{ label: 'Pagamentos', tab: 'Financeiro' }],
            },
            {
              label: '📈 Marketing',
              id: 'marketing',
              items: [{ label: 'Leads', tab: 'Leads' }],
            },
          ].map((menu) => (
            <div key={menu.id} className="relative">
              <button
                onClick={() => toggleMenu(menu.id)}
                className="hover:bg-white/20 px-3 py-2 rounded"
              >
                {menu.label}
              </button>
              {openMenu === menu.id && (
                <div className="absolute top-full mt-2 bg-white text-black shadow rounded w-48 z-10">
                  {menu.items.map((item) => (
                    <button
                      key={item.tab}
                      onClick={() => {
                        setActiveTab(item.tab);
                        setOpenMenu('');
                      }}
                      className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setActiveTab('Profile')}
          className="hover:bg-white/20 px-3 py-2 rounded"
        >
          ⚙️ Perfil
        </button>
      </nav>

      {/* Conteúdo */}
      <main className="px-6 py-8">
        <h1 className="text-4xl font-bold mb-6">Bem vindo(a), {adminInfo?.fullName || 'Admin'}</h1>
        {activeTab === 'Dashboard' && renderDashboard()}
        {activeTab === 'Profile' && renderProfile()}
        {activeTab === 'Add Profissional' && renderAddDoctor()}
        {activeTab === 'Add Paciente' && renderAddPatient()}
        {activeTab === 'Calendário' && renderCalendarGeneral()}
        {activeTab === 'Financeiro' && renderFinanceiro()}
        {activeTab === 'Leads' && renderLeads()}
        {activeTab === 'Add Admin' && renderAddAdmin()}
      </main>
    </div>

  );
}