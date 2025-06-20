import { useCallback, useState } from 'react';
import { patientService } from '../services/patientService';
import { PatientData } from '../utils/types';

export const usePatients = () => {
    const [patients, setPatients] = useState<PatientData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPatients = useCallback(async (withAppointments = false) => {
        setLoading(true);
        setError(null);

        try {
            const data = await patientService.fetchAll(withAppointments);

            // Se precisar de informações adicionais de agendamentos
            if (withAppointments) {
                const patientsWithAppointments = await Promise.all(
                    data.map(async (patient) => {
                        try {
                            const summary = await patientService.getAppointmentsSummary(patient._id);
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
                setPatients(patientsWithAppointments);
            } else {
                setPatients(data);
            }
        } catch (err) {
            setError('Falha ao carregar pacientes');
            console.error('Erro ao buscar pacientes:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createPatient = async (patientData: PatientData) => {
        try {
            setLoading(true);
            setError(null);

            const newPatient = await patientService.create(patientData);
            setPatients(prev => [...prev, newPatient]);
            return newPatient;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updatePatient = async (id: string, patientData: Partial<PatientData>) => {
        try {
            setLoading(true);
            const updatedPatient = await patientService.update(id, patientData);
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