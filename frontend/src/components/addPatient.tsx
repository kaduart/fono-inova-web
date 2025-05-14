import { useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../backend/services/api';

const AddPatient = () => {
    const [patientData, setPatientData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Você não está autenticado. Por favor, faça login.');
                return;
            }
            const response = await fetch(`${BASE_URL}/admin/add-patient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(patientData)
            });
            if (response.ok) {
                setPatientData({
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    password: ''
                });
                toast.success('Paciente adicionado com sucesso!');
            } else if (response.status === 401) {
                toast.error('Sua sessão expirou. Por favor, faça login novamente.');
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Ocorreu um erro. Por favor, tente novamente.');
            }
        } catch (error) {
            toast.error('Ocorreu um erro. Por favor, tente novamente.');
        }
    };

    return (
        <div className="add-patient-form">
            <h2>Adicionar Novo Paciente</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullName"
                    value={patientData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nome"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={patientData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    value={patientData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Telefone"
                    required
                />
                <div className="password-field">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={patientData.password}
                        onChange={handleInputChange}
                        placeholder="Senha"
                        required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                </div>
                <button type="submit">Adicionar Paciente</button>
            </form>
        </div>
    );
};

export default AddPatient;
