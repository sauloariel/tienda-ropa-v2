import { Router } from 'express';
import { body } from 'express-validator';
import { login, getCurrentUser, logout } from '../controllers/AuthController';
import { inputErrors } from '../middleware';

const router = Router();

// Ruta para login
router.post('/login',
  body('email').isEmail().withMessage('Email válido es requerido'),
  body('password').isString().notEmpty().withMessage('Contraseña es requerida'),
  inputErrors,
  login
);

// Ruta para obtener usuario actual
router.get('/me', getCurrentUser);

// Ruta para logout
router.post('/logout', logout);

export default router;
