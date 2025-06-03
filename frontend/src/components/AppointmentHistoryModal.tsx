import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { X } from 'lucide-react';
import React from 'react';

interface AppointmentHistoryModalProps {
    open: boolean;
    onClose: () => void;
    appointments: Array<{
        _id: string;
        date: string;
        time: string;
        doctorId: { fullName: string };
        reason: string;
        status: string;
    }>;
}

const AppointmentHistoryModal: React.FC<AppointmentHistoryModalProps> = ({
    open,
    onClose,
    appointments
}) => {

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Histórico de Agendamentos
                <IconButton edge="end" onClick={onClose}>
                    <X />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {appointments.length === 0 ? (
                    <Box textAlign="center" py={4}>
                        <Typography variant="body1" color="textSecondary">
                            Não há agendamentos no histórico.
                        </Typography>
                    </Box>
                ) : (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Data</TableCell>
                                <TableCell>Hora</TableCell>
                                <TableCell>Profissional</TableCell>
                                <TableCell>Motivo</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.map((appt) => (
                                <TableRow key={appt._id}>
                                    <TableCell>{new Date(appt.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{appt.time}</TableCell>
                                    <TableCell>{`Dr. ${appt?.doctorId?.fullName} | '-'`}</TableCell>
                                    <TableCell>{appt.reason}</TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: 1,
                                                color: '#fff',
                                                backgroundColor:
                                                    appt.status === 'agendado' ? '#4CAF50'
                                                        : appt.status === 'concluído' ? '#2196F3'
                                                            : appt.status === 'cancelado' ? '#F44336'
                                                                : '#9E9E9E'
                                            }}
                                        >
                                            {appt.status}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AppointmentHistoryModal;
