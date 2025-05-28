// src/services/packageService.ts
import {
  IPaginatedPackageResponse,
  IPayment,
  ISession,
  ITherapyPackage,
  PackageStatus,
  PaymentType,
  TherapyType
} from '../utils/types';
import API from './api';

export type CreatePackageParams = {
  patientId: string;
  sessionType: TherapyType;
  /* totalSessions: number;
  sessionValue: number; */
  professional: string;
  paymentType: string;
  amountPaid: number;
  paymentMethod: string;
  durationMonths: number;
  sessionsPerWeek: number;
};

export type UpdatePackageParams = Partial<{
  totalSessions: number;
  sessionType: TherapyType;
  sessionValue: number;
}>;

export type PaginationParams = {
  page?: number;
  limit?: number;
  status?: PackageStatus;
  type?: TherapyType;
  startDate?: Date;
  endDate?: Date;
};

export type CreateSessionParams = {
  date: Date;
  professionalId: string;
  sessionType: TherapyType;
  value: number;
  notes?: string;
};

export type CreatePaymentParams = {
  amount: number;
  paymentMethod: PaymentType;
  coveredSessions: string[];
  notes?: string;
};

export type UseSessionParams = {
  _id?: string;
  date: string;
  package: string;
  professional: string;
  sessionType: 'fonoaudiologia' | 'terapeuta ocupacional' | 'psicologia' | 'fisioterapia';
  paymentAmount?: number;
  paymentMethod?: 'dinheiro' | 'pix' | 'cartão';
  notes?: string;
  durationMonths?: number;
  sessionsPerWeek?: number;
  status?: 'pending' | 'completed' | 'active';
};

export const packageService = {
  // Operações com Pacotes
  createPackage: async (data: CreatePackageParams) => {
    console.log('createPackage:', data);
    return API.post<ITherapyPackage>('/packages', data);
  },

  getPackage: async (id: string) => {
    return API.get<ITherapyPackage>(`/packages/${id}`);
  },

  updatePackage: async (id: string, data: UpdatePackageParams) => {
    return API.patch<ITherapyPackage>(`/packages/${id}`, data);
  },

  deletePackage: async (id: string) => {
    return API.delete<{ message: string }>(`/packages/${id}`);
  },

  listPackages: async (params: PaginationParams) => {
    return API.get<IPaginatedPackageResponse>('/packages', {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        status: params.status,
        type: params.type,
        startDate: params.startDate?.toISOString(),
        endDate: params.endDate?.toISOString()
      }
    });
  },

  // Operações com Sessões
  createSession: async (packageId: string, data: CreateSessionParams) => {
    return API.post<ISession>(`/packages/${packageId}/sessions`, data);
  },

  updateSession: async (packageId: string, data: Partial<any>) => {
    console.log('updateSession:', data);
    return API.put<ISession>(`/packages/${packageId}/sessions/${data.sessionId}`, data);
  },

  // Operações com Pagamentos
  createPayment: async (packageId: string, data: CreatePaymentParams) => {
    return API.post<IPayment>(`/packages/${packageId}/payments`, data);
  },

  // Operações Especiais
  searchPackages: async (filters: {
    status?: PackageStatus;
    type?: TherapyType;
    startDate?: Date;
    endDate?: Date;
  }) => {
    return API.get<ITherapyPackage[]>('/packages/search', {
      params: {
        ...filters,
        startDate: filters.startDate?.toISOString(),
        endDate: filters.endDate?.toISOString()
      }
    });
  },

  getPackageSessions: async (packageId: string) => {
    return API.get<ISession[]>(`/packages/${packageId}/sessions`);
  },

  getPackagePayments: async (packageId: string) => {
    return API.get<IPayment[]>(`/packages/${packageId}/payments`);
  },


  // Operação para "usar" uma sessão e atualizar pagamento
  useSession: async (packageId: string, data: UseSessionParams) => {
    return API.patch<ISession>(`/packages/${packageId}/use-session`, data);
  },
}

export const validatePayment = (amount: number, balance: number) => {
  if (amount <= 0) throw new Error("Valor deve ser maior que zero");
  if (amount > balance) {
    throw new Error(
      `Valor excede saldo devedor. Saldo atual: ${balance.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })}`
    );
  }
};

export default packageService;