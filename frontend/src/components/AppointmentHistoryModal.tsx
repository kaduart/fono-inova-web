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
import { getStatusColor } from '../utils/statusHelper';

interface AppointmentHistoryModalProps {
    open: boolean;
    onClose: () => void;
    appointments: Array<{
        _id: string;
        date: string;
        time: string;
        doctor: { fullName: string };
        reason: string;
        status: string;
    }>;
}

const AppointmentHistoryModal: React.FC<AppointmentHistoryModalProps> = ({
    open,
    onClose,
    appointments
}) => {
    // Função para determinar a cor do status
    /*     const getStatusColor = (status: string) => {
            console.log('status', status);
            switch (status?.toLowerCase()) {
                case 'agendado': return '#4CAF50';
                case 'concluído': return '#2196F3';
                case 'cancelado': return '#F44336';
                default: return '#9E9E9E';
            }
        }; */

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle
                sx={{
                    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 2,
                    px: 3
                }}
            >
                <Box display="flex" alignItems="center">
                    <Box
                        component="span"
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            width: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2
                        }}
                    >
                        <Box component="span" sx={{ fontSize: '1.2rem' }}>📋</Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Histórico de Agendamentos
                    </Typography>
                </Box>
                <IconButton
                    edge="end"
                    onClick={onClose}
                    sx={{ color: 'white' }}
                >
                    <X />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ py: 0, px: 0 }}>
                {appointments.length === 0 ? (
                    <Box
                        textAlign="center"
                        py={6}
                        sx={{ backgroundColor: '#f9fafb' }}
                    >
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                backgroundColor: '#eef2ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                mb: 2
                            }}
                        >
                            <Box component="span" sx={{ fontSize: '2rem' }}>📅</Box>
                        </Box>
                        <Typography variant="h6" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                            Nenhum agendamento registrado
                        </Typography>
                        <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 400, margin: '0 auto' }}>
                            Você ainda não possui agendamentos em seu histórico.
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ overflow: 'auto', maxHeight: '60vh' }}>
                        <Table
                            size="small"
                            sx={{
                                minWidth: 650,
                                '& .MuiTableCell-root': {
                                    borderBottom: '1px solid #f0f0f0'
                                }
                            }}
                        >
                            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                                <TableRow>
                                    <TableCell sx={{ py: 2, pl: 3, fontWeight: 600 }}>Data</TableCell>
                                    <TableCell sx={{ py: 2, fontWeight: 600 }}>Hora</TableCell>
                                    <TableCell sx={{ py: 2, fontWeight: 600 }}>Profissional</TableCell>
                                    <TableCell sx={{ py: 2, fontWeight: 600 }}>Especialidade</TableCell>
                                    <TableCell sx={{ py: 2, fontWeight: 600 }}>Serviço</TableCell>
                                    <TableCell sx={{ py: 2, pr: 3, fontWeight: 600 }} align="center">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map((appt) => (
                                    <TableRow
                                        key={appt._id}
                                        hover
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#f9fafb'
                                            }
                                        }}
                                    >
                                        <TableCell sx={{ py: 2, pl: 3 }}>
                                            <Typography variant="body2" fontWeight={500}>
                                                {new Date(appt.date).toLocaleDateString('pt-BR')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 2 }}>
                                            <Typography variant="body2">
                                                {appt.time}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 2 }}>
                                            <Typography variant="body2">
                                                Dr. {appt?.doctor?.fullName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 2 }}>
                                            <Typography variant="body2" color="textSecondary">
                                                {appt.specialty}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 2 }}>
                                            <Typography variant="body2" color="textSecondary">
                                                {{
                                                    evaluation: 'Avaliação',
                                                    session: 'Sessão',
                                                    package: 'Pacote',
                                                    individual_session: 'Sessão Avulsa'
                                                }[appt.payment.serviceType?.toLowerCase()?.trim()] || 'Desconhecido'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 2, pr: 3 }} align="center">
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: 'inline-block',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 12,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    backgroundColor: `${getStatusColor(appt.operationalStatus)}20`,
                                                    color: getStatusColor(appt.operationalStatus),
                                                    border: `1px solid ${getStatusColor(appt.operationalStatus)}`,
                                                    minWidth: 90
                                                }}
                                            >
                                                {appt.operationalStatus}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}
            </DialogContent>

            <Box sx={{
                backgroundColor: '#f9fafb',
                py: 2,
                px: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #f0f0f0'
            }}>
                <Typography variant="body2" color="textSecondary">
                    Total: {appointments.length} agendamentos
                </Typography>
                <Box>
                    <IconButton
                        size="small"
                        onClick={onClose}
                        sx={{
                            backgroundColor: '#e0e7ff',
                            color: '#4f46e5',
                            borderRadius: '6px',
                            px: 2,
                            py: 1,
                            '&:hover': {
                                backgroundColor: '#d1d5f7'
                            }
                        }}
                    >
                        <X size={16} />
                        <Typography variant="button" sx={{ ml: 1, fontSize: '0.875rem' }}>
                            Fechar
                        </Typography>
                    </IconButton>
                </Box>
            </Box>
        </Dialog>
    );
};

export default AppointmentHistoryModal;