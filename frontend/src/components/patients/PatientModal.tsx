// components/PatientModal.tsx
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import PatientForm from '../../shared/components/PatientForm';
import { PatientData } from '../../utils/types';

interface PatientModalProps {
    open: boolean;
    onClose: () => void;
    patient?: PatientData;
    onSaveSuccess?: (patient: PatientData) => void;
}

export const PatientModal = ({
    open,
    onClose,
    patient,
    onSaveSuccess
}: PatientModalProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            scroll="paper"
        >
            <DialogTitle>
                {patient ? 'Editar Paciente' : 'Novo Paciente'}
            </DialogTitle>

            <DialogContent dividers>
                <PatientForm
                    patient={patient}
                    onSuccess={onSaveSuccess}
                />
            </DialogContent>
        </Dialog>
    );
};