
import { Activity, ChevronDown, Clock, Eye, EyeOff, Hospital, Stethoscope, UserPlus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';
import { usePatients } from '../hooks/usePatients';
import doctorService, { CreateDoctorParams } from '../services/doctorService';
import { IDoctor, IPatient } from '../utils/types';
import EnhancedCalendar from './EnhancedCalendar';
import { PaymentModal } from './financial/PaymentModal';
import PaymentPage from './financial/PaymentPage';
import DoctorFormModal from './ManageDoctors/DoctorFormModal';
import ManageDoctors from './ManageDoctors/ManageDoctors';
import { LeadsTable } from './mkt/LeadsTable';
import AppChat from './mkt/whatsapp/AppChat';
import { PatientModal } from './patients/PatientModal';
import PatientTable from './patients/PatientTable';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import Input from './ui/Input';
import { Label } from './ui/Label';

const NavButton = ({
  children,
  active,
  onClick,
  icon,
  hasChevron = false
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  hasChevron?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600'
      }`}
  >
    {icon && <span>{icon}</span>}
    <span>{children}</span>
    {hasChevron && (
      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${active ? 'rotate-180' : ''}`} />
    )}
  </button>
);

const NavDropdownItem = ({
  children,
  active,
  onClick,
  icon
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-4 py-2 text-sm text-left space-x-2 ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
      }`}
  >
    {icon && <span className="text-gray-500">{icon}</span>}
    <span>{children}</span>
  </button>
);

const defaultAppointmentData = {
  patientId: '',
  doctorId: '',
  date: '',
  time: '',
  type: 'fonoaudiologia',
  reason: '',
  status: 'agendado'
};


const especialidadesDisponiveis = [
  { id: 'fonoaudiologia', label: 'Fonoaudiologia' },
  { id: 'psicologia', label: 'Psicologia' },
  { id: 'terapia_ocupacional', label: 'Terapia Ocupacional' },
  { id: 'fisioterapia', label: 'Fisioterapia' },
];

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
export default function AdminDashboard() {


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


  const [IPatient, setIPatient] = useState<IPatient>(initialPatientState);

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
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
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
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [adminData, setAdminData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [openMenu, setOpenMenu] = useState('');
  const [modalShouldClose, setModalShouldClose] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState<IPatient | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [showModalAddProfessional, setShowModalAddProfessional] = useState(false);

  const toggleMenu = (menuName: string) => {
    setOpenMenu(menuName);
  };

  const {
    patients,
    loading: patientsLoading,
    error: patientsError,
    fetchPatients: updatePatients,
    updatePatient,
    createPatient
  } = usePatients();

  // Use este useEffect para carregar os dados iniciais
  useEffect(() => {
    updatePatients(true); // true para carregar com informações de agendamentos
    fetchTotalPatients();
  }, [updatePatients]);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const handleEditPatient = (patient: IPatient) => {
    setPatientToEdit(patient); // Passa o paciente completo para edição
    setIsModalOpen(true);
    setActiveTab('Dashboard');
  };

  useEffect(() => {
    updatePatients(true);
    fetchTotalPatients();
  }, [updatePatients]);

  useEffect(() => {
  }, [isModalOpen, patientToEdit]);

  const handleAddPatient = () => {
    setPatientToEdit(undefined);
    setIsModalOpen(true);
    setActiveTab('Dashboard'); // Força voltar para dashboard

    // Debug adicional
    setTimeout(() => {

    }, 0);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setOpenMenu('');

    if (tab === 'Add Paciente') {

      handleAddPatient(); // Usar a função existente que já configura o estado corretamente
    }
  };

  const handleAddProfessional = () => {
    setPatientToEdit(undefined);
    setShowModalAddProfessional(true);

  };

  const handleRegisterPayment = (patient: IPatient) => {

    setSelectedPatient(patient);
    setPaymentModalOpen(true);
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
    setIPatient((prev) => {


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
      } else {
        await doctorService.createDoctor(doctor);
        toast.success("Profissional cadastrado com sucesso!");
      }

      setModalShouldClose(true);
      setShowModalAddProfessional(false);

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

  const handleSavePatient = async (formData: IPatient) => {
    setIsLoading(true);
    try {
      if (formData._id) {

        await updatePatient(formData._id, {
          ...formData,
          dateOfBirth: new Date(formData.dateOfBirth).toISOString()
        });
        toast.success("Paciente atualizado com sucesso!");
      } else {
        await createPatient({
          ...formData,
          dateOfBirth: new Date(formData.dateOfBirth).toISOString()
        });
        toast.success("Paciente criado com sucesso!");
      }

      updatePatients(true);
      fetchPatientOverview();
      fetchTotalPatients();
      setIsModalOpen(false);
      setPatientToEdit(undefined);
      setActiveTab('Dashboard');

    } catch (error: any) {


      console.error(error);
      toast.error(error.response.data.error || 'Erro ao salvar paciente.');
    }
  };

  const renderDashboard = () => {
    const occupancyRate = ((totalPatients / hospitalCapacity) * 100).toFixed(2);

    return (
      <>
        {/* Seção de cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-blue-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <CardHeader >
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-blue-500">
                  Total Profissionais
                </CardTitle>
              </div>
              <div
                onClick={handleAddProfessional}
                className='flex justify-end items-center text-blue-700 cursor-pointer hover:text-blue-900 bg-white p-1 rounded'
              >
                <UserPlus />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-blue-500 text-3xl font-bold">{totalDoctors}</div>
              <p className="text-xs text-blue-500 mt-1">Equipe médica ativa</p>

            </CardContent>
          </Card>

          <Card className="bg-green-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <CardHeader >
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-500" />
                <CardTitle className="text-green-500">
                  Total Pacientes
                </CardTitle>
              </div>
              <div onClick={handleAddPatient}
                className='flex justify-end items-center text-green-700 cursor-pointer hover:text-green-900 bg-white p-1 rounded'
              >
                <UserPlus />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-green-500 text-3xl font-bold">{totalPatients}</div>
              <p className="text-xs text-green-500 mt-1">Atualmente admitidos</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <CardHeader >
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-purple-500">
                  Ocupação
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-purple-500 text-3xl font-bold">{occupancyRate}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${occupancyRate}%` }}
                ></div>
              </div>
              <p className="text-xs text-purple-500 mt-1">Taxa de ocupação</p>
            </CardContent>
          </Card>
        </div>

        {/* Seção de tabela de pacientes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Últimos Pacientes</h3>
          <PatientTable
            patients={patients}
            onEditPatient={(patient) => {
              setPatientToEdit(patient);
              setIsModalOpen(true);
            }}
            onRegisterPayment={handleRegisterPayment}
          />

        </div>


        <PaymentModal
          open={paymentModalOpen}
          patient={selectedPatient}
          onClose={() => setPaymentModalOpen(false)}
          doctors={doctors}
          onPaymentSuccess={() => {
            updatePatients(); // Atualiza a lista de pacientes
            //fetchPayments(); // Atualiza a lista de pagamentos
          }}
        />

        {/* Seção de visões gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-gray-200 rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Visão Geral dos Profissionais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {doctorOverview.slice(0, 3).map((doctor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Stethoscope className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-gray-500">{doctor.specialty}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {doctor.patients} pacientes
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-3">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-blue-50"
                onClick={() => setShowDoctors(!showDoctors)}
              >
                {showDoctors ? 'Mostrar menos' : 'Ver todos'}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-gray-200 rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Próximas Consultas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <ul className="space-y-3">
                  {upcomingAppointments.slice(0, 3).map((appointment, index) => (
                    <li key={index} className="p-3 hover:bg-gray-50 rounded">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{appointment.patientId?.fullName}</p>
                          <p className="text-sm text-gray-500">
                            {appointment.doctorId?.fullName} • {appointment.reason}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {new Date(appointment.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">{appointment.time}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6">
                  <Clock className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Nenhuma consulta agendada
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="w-1/2 p-4">
          {isModalOpen && (
            <PatientModal
              open={isModalOpen}
              patient={patientToEdit || initialPatientState}
              onClose={() => {
                setIsModalOpen(false);
                setPatientToEdit(undefined);
                setActiveTab('Dashboard'); // Volta para a dashboard após fechar
              }}
              onSaveSuccess={(patient) => {

                handleSavePatient(patient);
              }}
            />
          )}
        </div>
        <DoctorFormModal
          open={showModalAddProfessional}
          onClose={() => setShowModalAddProfessional(false)}
          onSubmitDoctor={handleSaveDoctor}
        />
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

  const renderAddDoctor = () => {
    return (
      <ManageDoctors
        onSubmitDoctor={handleSaveDoctor}
        doctors={doctors}
        patients={patients}
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalShouldClose={modalShouldClose}
      />
    );
  }

  const renderCalendarGeneral = () => {
    return (
      <EnhancedCalendar doctors={doctors} />
    );
  };


  const renderLeads = () => (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Leads e Marketing</h2>
      <LeadsTable />
    </div>
  );

  const renderMessages = () => (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Mensagem</h2>
      <AppChat />
    </div>
  );

  const renderFinanceiro = () => (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Controle Financeiro</h2>
      <PaymentPage patients={patients} doctors={doctors} />
    </div>
  );

  const handleAvailableSubmit = async (data: AvailableData) => {
    try {
      const response = await fetch("/api/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erro ao salvar avaliação");

      // Opcional: feedback, recarregar dados, etc
      toast.success("Avaliação salva com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar avaliação.");
    }
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

  // Substitua o retorno principal do componente por este:
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Cabeçalho moderno */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <NavLink
                to="/admin"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                onClick={() => handleTabChange('Dashboard')}
              >
                <div className="bg-blue-100/80 p-2.5 rounded-xl shadow-sm">
                  <Hospital className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-500 transition-all duration-300">
                  Fono<span className="font-extrabold">Inova</span>&nbsp;&nbsp;
                </span>
              </NavLink>
            </div>

            {/* Menu de navegação superior - Versão refinada */}
            <nav className="hidden md:flex items-center space-x-2">
              {/* Dashboard */}
              <NavButton
                active={activeTab === 'Dashboard'}
                onClick={() => handleTabChange('Dashboard')}
              >
                Dashboard
              </NavButton>

              {/* Gestão */}
              <div className="relative">
                <NavButton
                  active={activeTab === 'Add Profissional' || activeTab === 'Add Paciente'}
                  onClick={() => toggleMenu('gestao')}
                  hasChevron
                >
                  Gestão
                </NavButton>

                {openMenu === 'gestao' && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                    <NavDropdownItem
                      active={activeTab === 'Add Profissional'}
                      onClick={() => handleTabChange('Add Profissional')}
                      icon={<Stethoscope className="h-4 w-4" />}
                    >
                      Profissionais
                    </NavDropdownItem>
                    <NavDropdownItem
                      active={activeTab === 'Add Paciente'}
                      onClick={() => handleTabChange('Add Paciente')}
                      icon={<Users className="h-4 w-4" />}
                    >
                      Pacientes
                    </NavDropdownItem>
                  </div>
                )}
              </div>

              {/* Agenda */}
              <NavButton
                active={activeTab === 'Calendário'}
                onClick={() => handleTabChange('Calendário')}
                icon={<Clock className="h-4 w-4" />}
              >
                Agenda
              </NavButton>

              {/* Financeiro */}
              <NavButton
                active={activeTab === 'Financeiro'}
                onClick={() => handleTabChange('Financeiro')}
                icon={<span className="text-sm">💵</span>}
              >
                Financeiro
              </NavButton>

              {/* Marketing */}
              <div className="relative">
                <NavButton
                  active={activeTab === 'Leads'}
                  onClick={() => toggleMenu('marketing')}
                  icon={<Activity className="h-4 w-4" />}
                  hasChevron
                >
                  Marketing
                </NavButton>

                {openMenu === 'marketing' && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                    <NavDropdownItem
                      active={activeTab === 'Leads'}
                      onClick={() => handleTabChange('Leads')}
                    >
                      Leads
                    </NavDropdownItem>
                  </div>
                )}
              </div>

              {/* WhatsApp */}
              <NavButton
                active={activeTab === 'Mensagens'}
                onClick={() => handleTabChange('Mensagens')}
                icon={<span className="text-sm">📳</span>}
              >
                WhatsApp
              </NavButton>
            </nav>

            {/* Botão de perfil */}
            <button
              onClick={() => setActiveTab('Profile')}
              className="p-1 rounded-full text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">
                  {adminInfo?.fullName?.charAt(0) || 'A'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Cabeçalho da página */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeTab === 'Dashboard' && 'Visão Geral'}
            {activeTab === 'Profile' && 'Meu Perfil'}
            {activeTab === 'Add Profissional' && 'Gestão de Profissionais'}
            {/* Adicione outros títulos conforme necessário */}
          </h2>

          {activeTab === 'Dashboard' && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                Atualizado em {formatDate(new Date())}
              </span>
            </div>
          )}
        </div>

        {/* Renderização do conteúdo */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'Dashboard' && renderDashboard()}
          {activeTab === 'Profile' && renderProfile()}
          {activeTab === 'Add Profissional' && renderAddDoctor()}
          {activeTab === 'Add Paciente'}
          {activeTab === 'Calendário' && renderCalendarGeneral()}
          {activeTab === 'Financeiro' && renderFinanceiro()}
          {activeTab === 'Leads' && renderLeads()}
          {activeTab === 'Mensagens' && renderMessages()}
          {activeTab === 'Add Admin' && renderAddAdmin()}
        </div>
      </main>
    </div>
  );
}