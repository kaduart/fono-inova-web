import API from "./api";

export type DoctorRole = 'doctor';

export type CreateDoctorParams = {
    _id?: string; // opcional para criação, obrigatório para atualização
    fullName: string;
    email: string;
    password: string;
    specialty: string;
    licenseNumber: string;
    phoneNumber: string;
    active: string; // pode ser 'true' ou 'false' como string, conforme seu backend
    role?: DoctorRole;
};

export type Doctor = {
    _id: string;
    fullName: string;
    email: string;
    specialty: string;
    licenseNumber: string;
    phoneNumber: string;
    active: string;
    role: DoctorRole;
    createdAt?: string;
    updatedAt?: string;
};

export const doctorService = {
    createDoctor: async (data: CreateDoctorParams) => {
        return API.post<Doctor>('/doctor', data);
    },

    getAllDoctors: async () => {
        return API.get<Doctor[]>('/doctor');
    },

    getDoctorById: async (id: string) => {
        return API.get<Doctor>(`/doctor/${id}`);
    },

    deleteDoctor: async (id: string) => {
        return API.delete<{ message: string }>(`/doctor/${id}`);
    },

    updateDoctor: async (id: string, data: CreateDoctorParams) => {
        return API.patch<Doctor>(`/doctor/${id}`, data);
    }
};

export default doctorService;
