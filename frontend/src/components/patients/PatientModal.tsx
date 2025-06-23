// components/PatientModal.tsx
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { X } from 'lucide-react';
import PatientForm from '../../shared/components/PatientForm';
import { PatientData } from '../../utils/types';

interface PatientModalProps {
    open: boolean;
    onClose: () => void;
    patient?: PatientData;
    onSaveSuccess?: (patient: PatientData) => void;
    isLoading?: boolean;
}

export const PatientModal = ({
    open,
    onClose,
    patient,
    isLoading = false,
    onSaveSuccess
}: PatientModalProps) => {

    if (!open) {
        console.log('Modal not rendering because open is false');
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={isLoading ? undefined : onClose}
            fullWidth
            scroll="paper"
            PaperProps={{
                style: {
                    width: '50%',
                    maxWidth: 'none',
                    margin: 'auto',
                    borderRadius: '12px'
                }
            }}
        >
            <DialogTitle>
                <div className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-tl-lg rounded-tr-lg">
                    <span>{patient?._id ? 'Editar Paciente' : 'Novo Paciente'}</span>
                    <X className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-700" onClick={onClose} />
                </div>
            </DialogTitle>

            <DialogContent dividers>
                <PatientForm
                    patient={patient}
                    onSuccess={onSaveSuccess}
                    isLoading={isLoading}
                />
            </DialogContent>
        </Dialog>
    );
};