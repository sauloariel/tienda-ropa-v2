import { useState, useEffect } from 'react';
import { authService, User } from '../services/auth';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = authService.getUser();
    setUser(currentUser);
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Bienvenido, {user.nombre}!
            </h1>
            
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Información del Usuario
              </h2>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.nombre}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Rol</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {user.rol}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Estado</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.estado 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.estado ? 'Activo' : 'Inactivo'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Sistema de Autenticación
              </h2>
              <p className="text-gray-600 mb-4">
                El sistema de login está funcionando correctamente con JWT y control de roles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800">✅ Login</h3>
                  <p className="text-sm text-green-600">Autenticación JWT</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800">🔐 Roles</h3>
                  <p className="text-sm text-blue-600">Control de acceso</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-800">🛡️ Guards</h3>
                  <p className="text-sm text-purple-600">Rutas protegidas</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-800">💾 Persistencia</h3>
                  <p className="text-sm text-orange-600">localStorage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
