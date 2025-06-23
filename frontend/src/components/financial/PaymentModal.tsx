import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createPayment } from '../../services/paymentService';
import { IDoctor, PatientData, PaymentMethods, ServiceTypes } from '../../utils/types';
import { Button } from '../ui/Button';
import Input from '../ui/Input';
import InputCurrency from '../ui/InputCurrency';
import { Label } from '../ui/Label';
import { Select } from '../ui/Select';

interface PaymentModalProps {
    open: boolean;
    onClose: () => void;
    patient?: PatientData | null;
    patients?: PatientData[];
    doctors: IDoctor[];
    onPaymentSuccess: () => void;
}

export const PaymentModal = ({
    open,
    onClose,
    patient,
    patients,
    doctors,
    onPaymentSuccess
}: PaymentModalProps) => {
    const [paymentData, setPaymentData] = useState({
        serviceType: 'evaluation',
        patientId: patient?._id,
        professionalId: doctors.length > 0 ? doctors[0]._id : '',
        amount: 0,
        status: 'pending',
        paymentMethod: 'dinheiro',
        notes: '',
        packageId: '',
        sessionId: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    console.log('patient:', patient);
    console.log('FORM', paymentData);
    const handleSubmit = async () => {
        console.log('Dados do pagamento:', paymentData);
        // Validação do paciente
        if (!paymentData.patientId) {
            toast.error('Selecione um paciente');
            return;
        }

        // Validação do profissional
        if (!paymentData.professionalId) {
            toast.error('Selecione um profissional');
            return;
        }

        // Validação do valor
        const amount = parseFloat(paymentData.amount.toString());
        if (isNaN(amount) || amount <= 0) {
            toast.error('Valor inválido');
            return;
        }

        try {
            setIsLoading(true);

            await createPayment({
                patientId: paymentData.patientId,
                doctorId: paymentData.professionalId,
                serviceType: paymentData.serviceType,
                amount: amount,
                status: paymentData.status,
                paymentMethod: paymentData.paymentMethod,
                notes: paymentData.notes,
                ...(paymentData.serviceType === 'package' && { packageId: paymentData.packageId }),
                ...(paymentData.serviceType !== 'evaluation' && { sessionId: paymentData.sessionId })
            });

            toast.success('Pagamento registrado com sucesso!');
            onPaymentSuccess();
            onClose();

            // Reset form
            setPaymentData({
                serviceType: 'evaluation',
                patientId: patient?._id || '', // Mantém o paciente se já estava definido
                professionalId: doctors.length > 0 ? doctors[0]._id : '',
                amount: 0,
                status: 'pending',
                paymentMethod: 'dinheiro',
                notes: '',
                packageId: '',
                sessionId: ''
            });
        } catch (error: any) {
            console.error('Erro ao registrar pagamento:', error);
            toast.error(error.message || 'Erro ao registrar pagamento');
        } finally {
            setIsLoading(false);
        }
    };

    if (!open) return null;

    return (
        <Dialog
            open={open}
            onClose={isLoading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                <div className="flex items-center justify-between p-4">
                    <span>
                        {patient
                            ? `Registrar Pagamento - ${patient.fullName}`
                            : 'Registrar Pagamento'}
                    </span>
                    <X
                        className={`cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
                        onClick={isLoading ? undefined : onClose}
                    />
                </div>
            </DialogTitle>

            <DialogContent dividers>
                <div className="space-y-4 p-2">
                    {patients && patients.length > 0 && (
                        <div>
                            <Label >Paciente *</Label>
                            <Select
                                value={paymentData.patientId}
                                onChange={(e) => setPaymentData({
                                    ...paymentData, patientId: e.target.value
                                })}
                                disabled={isLoading}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Selecione um paciente</option>
                                {patients?.map(patient => (
                                    <option key={patient._id} value={patient._id}>
                                        {patient.fullName}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    )}
                    <div>
                        <Label>Médico/Doutor *</Label>
                        <Select
                            value={paymentData.professionalId}
                            onChange={(e) => setPaymentData({
                                ...paymentData,
                                professionalId: e.target.value
                            })}
                            disabled={isLoading || doctors.length === 0}
                        >
                            {doctors && doctors.map(doctor => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.fullName}
                                    {doctor.specialty ? ` (${doctor.specialty})` : ''}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <Label>Tipo de Serviço *</Label>
                        <Select
                            value={paymentData.serviceType}
                            onChange={(e) => setPaymentData({
                                ...paymentData,
                                serviceType: e.target.value
                            })}
                            disabled={isLoading}
                        >
                            {ServiceTypes.map(service => (
                                <option key={service.value} value={service.value}>
                                    {service.label}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <Label>Valor (R$) *</Label>
                        <InputCurrency
                            value={paymentData.amount}
                            onChange={(e) => setPaymentData({
                                ...paymentData,
                                amount: e.target.value
                            })}
                            disabled={isLoading}
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div>
                        <Label>Forma de Pagamento *</Label>
                        <Select
                            value={paymentData.paymentMethod}
                            onChange={(e) => setPaymentData({
                                ...paymentData,
                                paymentMethod: e.target.value
                            })}
                            disabled={isLoading}
                        >
                            {PaymentMethods.map(method => (
                                <option key={method.value} value={method.value}>
                                    {method.label}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <Label>Observações</Label>
                        <Input
                            value={paymentData.notes}
                            onChange={(e) => setPaymentData({
                                ...paymentData,
                                notes: e.target.value
                            })}
                            disabled={isLoading}
                            placeholder="Opcional"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registrando...' : 'Confirmar Pagamento'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};