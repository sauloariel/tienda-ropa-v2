import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, User } from '../services/auth';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [showRole, setShowRole] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getUser();
    setUser(currentUser);
    
    // Mostrar el rol solo una vez al cargar
    if (currentUser && !sessionStorage.getItem('roleShown')) {
      setShowRole(true);
      sessionStorage.setItem('roleShown', 'true');
      
      // Ocultar después de 3 segundos
      setTimeout(() => {
        setShowRole(false);
      }, 3000);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Panel Administrativo
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Mostrar rol solo una vez */}
            {showRole && (
              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                Rol: {user.rol}
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">
                {user.nombre}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
