import { Hospital } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

export const Header = () => {
    const navigate = useNavigate();
    const handleButtonClick = (route) => {
        navigate(route);
    };
    return (
        <header className="bg-white text-blue-700 px-6 py-4 shadow flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                    <Hospital className="h-6 w-6 text-blue-600" />
                </div>
                <NavLink to="/admin" className={({ isActive }) =>
                    `text-2xl font-extrabold leading-tight tracking-tight ${isActive ? 'text-blue-900' : 'text-blue-700'
                    }`
                }
                >
                    Clínica Fono <span className="text-blue-500">Inova</span>
                </NavLink>

            </div>

            <div className="flex items-center gap-4">
                <Button className='text-blue-700 px-4 py-2 shadow flex items-center justify-between' onClick={() => handleButtonClick('/login')}>Login</Button>
                <Button className='text-blue-700 px-4 py-2 shadow flex items-center justify-between' onClick={() => handleButtonClick('/signup')}>Sair</Button>
            </div>

        </header>
    );
};
