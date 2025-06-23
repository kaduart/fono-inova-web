// types.ts
export type TherapyType = 'fonoaudiologia' | 'terapeuta ocupacional' | 'psicologia' | 'fisioterapia';
export type PaymentType = 'full' | 'per-session' | 'partial';
export type PackageStatus = 'ativo' | 'finalizado';

export const THERAPY_TYPES = [
    { value: 'fonoaudiologia', label: 'Fonoaudiologia' },
    { value: 'terapeuta ocupacional', label: 'Terapia Ocupacional' },
    { value: 'psicologia', label: 'Psicologia' },
    { value: 'fisioterapia', label: 'Fisioterapia' },
    { value: 'pediatria', label: 'Pediatria' },
    { value: 'neuropediatria', label: 'Neuropediatria' }
];

export const PAYMENT_TYPES = [
    { value: 'full', label: 'Pagamento total antecipado' },
    { value: 'per-session', label: 'Pagamento por sessão' },
    { value: 'partial', label: 'Pagamento parcial' },
];

export const statusConfig = {
    active: {
        color: 'bg-green-100 text-green-800',
        text: 'Ativo',
        tagColor: 'green',
    },
    pending: {
        color: 'bg-yellow-100 text-yellow-800',
        text: 'Pendente',
        tagColor: 'gold',
    },
    completed: {
        color: 'bg-blue-100 text-blue-800',
        text: 'Completo',
        tagColor: 'blue',
    },
    default: {
        color: 'bg-gray-100 text-gray-800',
        text: 'Indefinido',
        tagColor: 'gray',
    },
};

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
    limit: number;
}

export interface IPayment {
    _id: string;
    amount: number;
    paymentMethod: 'dinheiro' | 'pix' | 'cartão';
    date?: string; // Adicionar se existir nos dados reais
    notes?: string;
}

export interface ISession {
    _id?: string;
    date: string;
    professional: string;
    patient: string;
    package: string;
    sessionType: 'fonoaudiologia' | 'terapeuta ocupacional' | 'psicologia' | 'fisioterapia';
    status: 'pending' | 'completed' | 'canceled';
    paymentAmount?: number;
    paymentMethod?: 'dinheiro' | 'pix' | 'cartão';
    notes?: string;
    isPaid?: boolean;
}

export const DURATION_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);
export const FREQUENCY_OPTIONS = Array.from({ length: 5 }, (_, i) => i + 1);

export interface ITherapyPackage {
    _id: string;
    patient: string;
    professional: string;
    sessionType: 'fonoaudiologia' | 'terapeuta ocupacional' | 'psicologia' | 'fisioterapia';
    totalSessions: number;
    sessions: ISession[];
    sessionsDone: number;
    sessionValue: number;
    payments: IPayment[];
    status: 'active' | 'completed' | 'pending';
    totalPaid: number;
    balance: number;
    remaining: number;
    totalValue: number;
    credit: number;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
}

// export Interface da resposta paginada
export interface IPaginatedPackageResponse {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    data: ITherapyPackage[];
}

export const defaultAppointmentData = {
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: 'fonoaudiologia',
    reason: '',
    status: 'agendado'
};

export interface IDoctors {
    fullName: '',
    specialty: '',
    active: '',
    _id: '',
    email: '',
    phoneNumber: '',
    licenseNumber: '',
    password: '',
    createdAt: string;
    updatedAt: string;
}

export interface IDoctor {
    _id: string;
    fullName: string;
    specialty: string;
    email: string;
    phoneNumber: string;
    licenseNumber: string;
    password: string;
    active: boolean;
}

export const PatientInitialValues = {
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
    imageAuthorization: false
}

export interface ScheduleAppointment {
    patientId: string;
    doctorId: string;
    date: string;
    time: string;
    sessionType: 'fonoaudiologia' | 'terapeuta ocupacional' | 'psicologia' | 'fisioterapia';
    notes?: string;
    paymentAmount?: number;
    paymentMethod?: 'dinheiro' | 'pix' | 'cartão';
    status: 'agendado' | 'concluído' | 'cancelado';
}

export const ServiceTypes = [
    { value: 'evaluation', label: 'Avaliação Inicial' },
    { value: 'session', label: 'Sessão Avulsa' },
    { value: 'package', label: 'Pacote' },
    { value: 'other', label: 'Outro Serviço' }
];

export const PaymentMethods = [
    { value: 'dinheiro', label: 'Dinheiro' },
    { value: 'pix', label: 'PIX' },
    { value: 'cartão', label: 'Cartão' }
];

export interface SelectedEvent {
    patientId: string;
    patientName: string;
    doctor: {
        id: string;
        name: string;
    },
    doctorName: {
        id: string;
        name: string;
    },
    status: string;
    start: string;
    date: Date | null;
    formattedDate: string;
}

export interface IPatient {
    _id?: string;
    fullName: string;
    dateOfBirth: string;
    birthCertificate: string;
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
    nextAppointment: string;
    lastAppointment: string;
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

export type AppointmentStatus =
    | 'scheduled'
    | 'confirmed'
    | 'completed'
    | 'canceled'
    | 'no_show';

export interface IAppointment {
    _id: string;
    patient: IPatient | string;
    doctor: IDoctor | string;
    date: Date;
    startTime: string;
    endTime: string;
    reason: string;
    status: AppointmentStatus;
    duration: number; // em minutos
    sessionType?: TherapyType;
    paymentMethod?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    canceledAt?: Date;
    canceledReason?: string;
}

export interface IAppointmentResponse extends Omit<IAppointment, 'patient' | 'doctor'> {
    patient: IPatient;
    doctor: IDoctor;
}

export interface IPaginatedAppointmentResponse {
    data: IAppointmentResponse[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface IAvailableSlot {
    time: string;
    available: boolean;
}