import bcrypt from 'bcrypt';
import { Usuario } from '../models/Usuario.model';
import db from '../config/db';

async function seedUsuarios() {
  try {
    console.log('🌱 Iniciando seed de usuarios...');

    // Conectar a la base de datos
    await db.authenticate();
    await db.sync();

    // Verificar si ya existe el usuario admin
    const adminExists = await Usuario.findOne({
      where: { email: 'admin@tienda.com' }
    });

    if (adminExists) {
      console.log('✅ Usuario admin ya existe');
      return;
    }

    // Crear contraseña encriptada
    const passwordHash = await bcrypt.hash('Admin1234!', 10);

    // Crear usuario admin
    await Usuario.create({
      nombre: 'Administrador',
      email: 'admin@tienda.com',
      password: passwordHash,
      rol: 'Admin',
      estado: true
    });

    console.log('✅ Usuario admin creado exitosamente');
    console.log('📧 Email: admin@tienda.com');
    console.log('🔑 Password: Admin1234!');

  } catch (error) {
    console.error('❌ Error en seed de usuarios:', error);
  } finally {
    await db.close();
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  seedUsuarios();
}

export default seedUsuarios;