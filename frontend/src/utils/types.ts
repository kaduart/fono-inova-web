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

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
    limit: number;
}

export interface ISession {
    _id: string;
    date: string;
    professional: string;
    sessionType: 'fonoaudiologia' | 'terapeuta ocupacional' | 'psicologia' | 'fisioterapia';
    notes: string;
    value?: number; // Opcional baseado no JSON
    isPaid: boolean;
    paymentMethod: 'dinheiro' | 'pix' | 'cartão' | null;
}

export interface IPayment {
    _id: string;
    amount: number;
    date: string;
    coveredSessions: (string | null)[];
    paymentMethod: 'dinheiro' | 'pix' | 'cartão';
    notes: string;
}

// export Interface principal do Pacote
// interfaces/Package.ts
export interface ITherapyPackage {
    _id: string;
    patient: string;
    sessionType: string;
    professionalId: string;
    totalSessions: number;
    sessionsDone: number;
    sessionValue: number;
    totalPaid: number;
    balance: number;
    amountPaid: number;
    paymentType?: string;
    remaining?: number; // Virtual
    totalValue?: number; // Virtual
    sessions: Array<{
        _id: string;
        date: Date;
        status: 'pending' | 'used';
        professional: string;
    }>;
    payments: Array<{
        _id: string;
        amount: number;
        date: Date;
        paymentMethod: 'dinheiro' | 'pix' | 'cartão';
    }>;
    createdAt: Date;
    updatedAt: Date;
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
    _id: ''
}

export interface IDoctor {
    _id: string;
    fullName: string;
    specialty: string;
}

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