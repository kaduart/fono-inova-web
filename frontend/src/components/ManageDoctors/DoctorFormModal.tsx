import { Modal } from "@mui/material";
import { IDoctor } from "../../utils/types";
import DoctorForm from "./DoctorForm";

interface DoctorFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmitDoctor: (data: IDoctor) => void;
    selectedDoctor: IDoctor | null
};

const DoctorFormModal = ({ open, onClose, onSubmitDoctor, selectedDoctor }: DoctorFormModalProps) => {
    return (
        <Modal open={open} onClose={onClose}>
            <DoctorForm selectedDoctor={selectedDoctor} onCancel={onClose} onSubmitDoctor={onSubmitDoctor} />
        </Modal>
    );
};

export default DoctorFormModal;

