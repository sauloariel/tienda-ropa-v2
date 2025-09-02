const { Loguin } = require('./src/models/Loguin.model');
const { Empleados } = require('./src/models/Empleados.model');
const { Roles } = require('./src/models/Roles.model');

async function debugLogin() {
    try {
        console.log('🔍 Debugging login for admin user...');

        // Buscar el usuario en la tabla loguin
        const loguinData = await Loguin.findOne({
            where: { usuario: 'admin' },
            include: [
                {
                    model: Empleados,
                    as: 'empleado',
                    attributes: ['id_empleado', 'nombre', 'apellido', 'mail', 'telefono', 'estado']
                },
                {
                    model: Roles,
                    as: 'rol',
                    attributes: ['id_rol', 'descripcion']
                }
            ]
        });

        if (!loguinData) {
            console.log('❌ Usuario no encontrado');
            return;
        }

        console.log('✅ Usuario encontrado:');
        console.log('  - ID:', loguinData.id_loguin);
        console.log('  - Usuario:', loguinData.usuario);
        console.log('  - ID Empleado:', loguinData.id_empleado);
        console.log('  - ID Rol:', loguinData.id_rol);

        if (loguinData.empleado) {
            console.log('  - Empleado:', loguinData.empleado.nombre, loguinData.empleado.apellido);
            console.log('  - Estado empleado:', loguinData.empleado.estado);
        } else {
            console.log('  - ❌ No se encontró empleado asociado');
        }

        if (loguinData.rol) {
            console.log('  - Rol:', loguinData.rol.descripcion);
        } else {
            console.log('  - ❌ No se encontró rol asociado');
        }

        // Verificar si el empleado está activo
        if (loguinData.empleado?.estado !== 'ACTIVO') {
            console.log('❌ Cuenta de empleado inactiva');
        } else {
            console.log('✅ Cuenta de empleado activa');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

debugLogin();
