import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import RoleRoute from './components/RoleRoute';
import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Ruta de login */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta raíz - redirigir a dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Rutas protegidas */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Header />
            <Dashboard />
          </PrivateRoute>
        } />
        
        {/* Ejemplo de ruta con control de roles */}
        <Route path="/admin-only" element={
          <PrivateRoute>
            <RoleRoute allowedRoles={['Admin']}>
              <Header />
              <div className="p-8">
                <h1 className="text-2xl font-bold">Solo para Administradores</h1>
                <p>Esta página solo es accesible para usuarios con rol Admin.</p>
              </div>
            </RoleRoute>
          </PrivateRoute>
        } />
        
        {/* Ejemplo de ruta para múltiples roles */}
        <Route path="/vendedor-inventario" element={
          <PrivateRoute>
            <RoleRoute allowedRoles={['Vendedor', 'Inventario']}>
              <Header />
              <div className="p-8">
                <h1 className="text-2xl font-bold">Vendedores e Inventario</h1>
                <p>Esta página es accesible para Vendedores e Inventario.</p>
              </div>
            </RoleRoute>
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}
