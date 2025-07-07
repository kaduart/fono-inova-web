import { useCallback, useState } from 'react';
import { patientService } from '../services/patientService';
import { IPatient } from '../utils/types/types';

export const usePatients = () => {
    const [patients, setPatients] = useState<IPatient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPatients = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Busca pacientes com todos os dados incluídos
            const data = await patientService.fetchAll();
            setPatients(data);
        } catch (err) {
            setError('Falha ao carregar pacientes');
            console.error('Erro ao buscar pacientes:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createPatient = async (IPatient: IPatient) => {
        try {
            setLoading(true);
            setError(null);

            const newPatient = await patientService.create(IPatient);
            setPatients(prev => [...prev, newPatient]);
            return newPatient;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updatePatient = async (id: string, IPatient: Partial<IPatient>) => {
        try {
            setLoading(true);
            const updatedPatient = await patientService.update(id, IPatient);
            setPatients(prev => prev.map(p =>
                p._id === id ? { ...p, ...updatedPatient } : p
            ));
            return updatedPatient;
        } catch (error) {
            setError('Falha ao atualizar paciente');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deletePatient = async (id: string) => {
        try {
            setLoading(true);
            await patientService.delete(id);
            setPatients(prev => prev.filter(p => p._id !== id));
        } catch (error) {
            setError('Falha ao remover paciente');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        patients,
        loading,
        error,
        fetchPatients,
        createPatient,
        updatePatient,
        deletePatient,
    };
};