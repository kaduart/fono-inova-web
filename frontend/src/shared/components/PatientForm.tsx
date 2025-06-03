// PatientForm.tsx (refatorado com validação Zod, estilizado com Card, CardHeader e CardContent)

import { zodResolver } from '@hookform/resolvers/zod';
import React, { JSX } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { BASE_URL } from '../../constants/constants';

import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/TextArea';

const BR_STATES = [
    { value: '', label: 'Selecione' },
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
];

const professions = [
    { value: "", label: "Selecione" },
    { value: "outros", label: "Outros" },
    { value: "medico", label: "Médico" },
    { value: "enfermeiro", label: "Enfermeiro" },
    { value: "fisioterapeuta", label: "Fisioterapeuta" },
    { value: "psicologo", label: "Psicólogo" },
];

const maritalStatusOptions = [
    { value: '', label: 'Selecione' },
    { value: 'solteiro', label: 'Solteiro(a)' },
    { value: 'casado', label: 'Casado(a)' },
    { value: 'divorciado', label: 'Divorciado(a)' },
    { value: 'viuvo', label: 'Viúvo(a)' },
];
const patientSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    dateOfBirth: z.string(),
    gender: z.string(),
    maritalStatus: z.string(),
    profession: z.string(),
    placeOfBirth: z.string(),
    address: z.object({
        street: z.string(),
        number: z.string(),
        district: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
    }),
    phone: z.string(),
    email: z.string().email(),
    cpf: z.string(),
    rg: z.string(),
    mainComplaint: z.string(),
    clinicalHistory: z.string(),
    medications: z.string(),
    allergies: z.string(),
    familyHistory: z.string(),
    healthPlan: z.object({
        name: z.string(),
        policyNumber: z.string()
    }),
    legalGuardian: z.string(),
    emergencyContact: z.object({
        name: z.string(),
        phone: z.string(),
        relationship: z.string()
    }),
    imageAuthorization: z.boolean()
});

type PatientFormData = z.infer<typeof patientSchema>;

interface PatientFormProps {
    onSuccess?: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSuccess }) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PatientFormData>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            fullName: '',
            dateOfBirth: '',
            gender: '',
            maritalStatus: '',
            profession: '',
            placeOfBirth: '',
            address: {
                street: '',
                number: '',
                district: '',
                city: '',
                state: '',
                zipCode: ''
            },
            phone: '',
            email: '',
            cpf: '',
            rg: '',
            mainComplaint: '',
            clinicalHistory: '',
            medications: '',
            allergies: '',
            familyHistory: '',
            healthPlan: {
                name: '',
                policyNumber: ''
            },
            legalGuardian: '',
            emergencyContact: {
                name: '',
                phone: '',
                relationship: ''
            },
            imageAuthorization: false
        }
    });

    const onSubmit = async (data: PatientFormData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(BASE_URL + '/patients/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                reset();
                onSuccess?.();
                toast.success('Paciente adicionado com sucesso!');
                const responseData = await response.json();
                navigate('/');

            } else {
                toast.error('Erro ao tentar adicionar um paciente!');
            }
        } catch {
            toast.error('Erro ao tentar adicionar um paciente!');
        }
    };

    const renderField = (label: string, field: JSX.Element, error?: string) => (
        <div className="space-y-1">
            <Label>{label}</Label>
            {field}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Adicionar Novo Paciente</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-6">

                    {/* Dados Pessoais */}
                    <div className="w-full">
                        <fieldset className="border p-4 rounded-md">
                            <legend className="px-2 font-medium text-gray-700">Dados Pessoais</legend>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="w-full md:w-1/2">
                                    {renderField('Nome completo', <Input {...register('fullName')} />, errors.fullName?.message)}
                                </div>
                                <div className="w-full md:w-1/4">
                                    {renderField('Data de nascimento', <Input type="date" {...register('dateOfBirth')} />, errors.dateOfBirth?.message)}
                                </div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        {renderField(
                                            'Gênero',
                                            <Select
                                                {...register('gender')}

                                            >
                                                <option value="">Selecione</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="feminino">Feminino</option>
                                                <option value="outro">Outro</option>
                                            </Select>,
                                            errors.gender?.message
                                        )}
                                    </div>

                                    <div>
                                        {renderField(
                                            'Estado civil',
                                            <Select
                                                {...register('maritalStatus')}

                                            >
                                                {maritalStatusOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </Select>,
                                            errors.maritalStatus?.message
                                        )}
                                    </div>

                                    <div>
                                        {renderField(
                                            'Profissão',
                                            <Select
                                                {...register('profession')}

                                            >
                                                {professions.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </Select>,
                                            errors.profession?.message
                                        )}
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2">
                                    {renderField('Naturalidade', <Input {...register('placeOfBirth')} />, errors.placeOfBirth?.message)}
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* Documentos & Contato */}
                    <div className="w-full">
                        <fieldset className="border p-4 rounded-md">
                            <legend className="px-2 font-medium text-gray-700">Documentos & Contato</legend>
                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div >
                                    {renderField('CPF', <Input {...register('cpf')} className="max-w-xs" />, errors.cpf?.message)}
                                </div>
                                <div >
                                    {renderField('RG', <Input {...register('rg')} className="max-w-xs" />, errors.rg?.message)}
                                </div>
                                <div>
                                    {renderField('Telefone', <Input {...register('phone')} />, errors.phone?.message)}
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 mt-3">
                                {renderField('E-mail', <Input type="email" {...register('email')} />, errors.email?.message)}
                            </div>
                        </fieldset>
                    </div>

                    {/* Endereço */}
                    <div className="w-full">
                        <fieldset className="border p-4 rounded-md">
                            <legend className="px-2 font-medium text-gray-700">Endereço</legend>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 md:col-span-10">
                                    {renderField(
                                        'Rua',
                                        <Input {...register('address.street')} />,
                                        errors.address?.street?.message
                                    )}
                                </div>

                                <div className="col-span-12 md:col-span-2">
                                    {renderField(
                                        'Número',
                                        <Input
                                            {...register('address.number')}
                                        />,
                                        errors.address?.number?.message
                                    )}
                                </div>

                            </div>

                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 md:col-span-3">
                                    {renderField(
                                        'Bairro',
                                        <Input {...register('address.district')} />,
                                        errors.address?.district?.message
                                    )}
                                </div>

                                <div className="col-span-12 md:col-span-3">
                                    {renderField('Cidade', <Input {...register('address.city')} />, errors.address?.city?.message)}
                                </div>
                                <div className='mt-1 col-span-6 md:col-span-4'>
                                    {renderField(
                                        'Estado',
                                        <Select
                                            {...register('address.state')}
                                        >
                                            {BR_STATES.map((st) => (
                                                <option key={st.value} value={st.value}>
                                                    {st.label}
                                                </option>
                                            ))}
                                        </Select>,
                                        errors.address?.state?.message
                                    )}
                                </div>
                                <div className="col-span-12 md:col-span-2">
                                    {renderField('CEP', <Input {...register('address.zipCode')} />, errors.address?.zipCode?.message)}
                                </div>

                            </div>
                        </fieldset>
                    </div>

                    <div className="w-full">
                        <fieldset className="border p-4 rounded-md">
                            <legend className="px-2 font-medium text-gray-700">Informações Clínicas</legend>
                            <div className="grid grid-cols-1 gap-4 mt-2">
                                <div>
                                    {renderField(
                                        'Queixa principal',
                                        <Textarea {...register('mainComplaint')} />,
                                        errors.mainComplaint?.message
                                    )}
                                </div>

                                <div>
                                    {renderField(
                                        'Histórico clínico',
                                        <Textarea {...register('clinicalHistory')} />,
                                        errors.clinicalHistory?.message
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        {renderField(
                                            'Medicações',
                                            <Textarea {...register('medications')} />,
                                            errors.medications?.message
                                        )}
                                    </div>
                                    <div>
                                        {renderField(
                                            'Alergias',
                                            <Textarea {...register('allergies')} />,
                                            errors.allergies?.message
                                        )}
                                    </div>
                                </div>

                                <div>
                                    {renderField(
                                        'Histórico familiar',
                                        <Textarea {...register('familyHistory')} />,
                                        errors.familyHistory?.message
                                    )}
                                </div>
                            </div>

                        </fieldset>
                    </div>

                    {/* Plano de Saúde & Responsável */}
                    <div className="w-full">
                        <fieldset className="border p-4 rounded-md">
                            <legend className="px-2 font-medium text-gray-700">Plano de Saúde & Responsável</legend>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="w-full md:w-1/4">
                                    {renderField('Convênio', <Input {...register('healthPlan.name')} />, errors.healthPlan?.name?.message)}
                                </div>
                                <div className="w-full md:w-1/4">
                                    {renderField('Nº da apólice', <Input {...register('healthPlan.policyNumber')} className="max-w-xs" />, errors.healthPlan?.policyNumber?.message)}
                                </div>
                                <div className="w-full md:flex-1">
                                    {renderField('Responsável legal', <Input {...register('legalGuardian')} />, errors.legalGuardian?.message)}
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* Contato de Emergência */}
                    <div className="w-full">
                        <fieldset className="border p-4 rounded-md">
                            <legend className="px-2 font-medium text-gray-700">Contato de Emergência</legend>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="w-full md:flex-1">
                                    {renderField('Nome', <Input {...register('emergencyContact.name')} />, errors.emergencyContact?.name?.message)}
                                </div>
                                <div className="w-full md:w-1/4">
                                    {renderField('Telefone', <Input {...register('emergencyContact.phone')} />, errors.emergencyContact?.phone?.message)}
                                </div>
                                <div className="w-full md:w-1/4">
                                    {renderField('Parentesco', <Input {...register('emergencyContact.relationship')} />, errors.emergencyContact?.relationship?.message)}
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="w-full">
                        <fieldset className="border p-4 rounded-md">
                            <legend className="px-2 font-medium text-gray-700">Autorização</legend>
                            <div className="w-full flex items-center space-x-2">
                                <input type="checkbox" {...register('imageAuthorization')} />
                                <Label>Autorizo o uso de imagem para postagens em redes sociais.</Label>
                            </div>
                        </fieldset>
                    </div>
                    <div className="w-full">
                        <Button type="submit" className="w-full">
                            Salvar Paciente
                        </Button>
                    </div>
                </form>

            </CardContent>
        </Card>
    );
};

export default PatientForm;
